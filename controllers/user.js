const User = require("../models/user");
const Task = require("../models/task");
const Label = require("../models/label");
const Subtask = require("../models/subtask");

const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  comparePassword,
  validateUserInput,
} = require("../helpers/input/inputHelpers");

const createHandler = async (req, res, next) => {
  try {
    // get body
    const body = req.body;

    // create user
    const user = await User.create({
      ...body,
    });

    sendJwtToClient(user, res);

    // return res.status(201).json({
    //   code: res.statusCode,
    //   success: true,
    //   data: user,
    //   message: "The user has been created successfully.",
    // });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

const login = async (req, res, next) => {
  try {
    // get email and password from the body
    const { email, password } = req.body;

    // checks email or password is null
    if (!validateUserInput(email, password)) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "Please check your inputs.",
      });
    }

    // finds a user by email in the database
    // User gives us a user table
    // when we define the model, we don't select the password to not show it in the API
    // to select the password again, '.select("+password")' use select function
    const user = await User.findOne({ email }).select("+password");

    // check passwords are equal
    if (!comparePassword(password, user.password)) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "Please check your credentials.",
      });
    }

    // if credentials are correct, then show the result
    sendJwtToClient(user, res);

    // return res.status(200).json({
    //   code: res.statusCode,
    //   success: true,
    //   message: "Logged in successfully.",
    // });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

// to logout, we need to remove our tokens
const logout = async (req, res, next) => {
  try {
    const { NODE_ENV } = process.env;

    return res
      .status(200)
      .cookie({
        http: true,
        expires: new Date(Date.now()), // we set current time to expire the token quickly
        secure: NODE_ENV === "development" ? false : true,
      })
      .json({
        success: true,
        message: "Logout Successful",
      });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

const getAll = async (req, res, next) => {
  try {
    // gets all tasks
    const users = await User.find().populate(["tasks", "labels"]);

    return res.status(200).json({
      code: res.statusCode,
      success: true,
      data: users,
      message: "Users fetched successfully.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

const getSingleUserTasks = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tasks = await Task.find({
      user: id,
    }).populate(["label", "subtasks"]);

    return res.status(200).json({
      code: res.statusCode,
      success: true,
      data: tasks,
      message: "User tasks fetched successfully.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

const updateHandler = async (req, res, next) => {
  try {
    // get task id
    const { id } = req.params;

    const { name, email } = req.body;

    const user = await User.findById(id);

    typeof name !== "undefined" ? (user.name = name) : "";
    typeof email !== "undefined" ? (user.email = email) : "";
    await user.save();

    return res.status(200).json({
      success: true,
      message: "The user has been updated successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

const deleteHandler = async (req, res, next) => {
  try {
    // get task id
    const { id } = req.params;

    // delete user
    await User.findByIdAndRemove(id);

    // delete tasks related to the user
    const tasks = await Task.find({
      user: id,
    });

    for (let index = 0; index < tasks.length; index++) {
      const element = tasks[index];

      if (typeof element.subtasks !== "undefined") {
        for (let index = 0; index < element.subtasks.length; index++) {
          const subTask = element.subtasks[index];

          await Subtask.findByIdAndRemove(subTask);
        }
      }
    }

    await Task.deleteMany({
      user: id,
    });

    // delete labels related to the user
    await Label.deleteMany({
      user: id,
    });

    return res.status(200).json({
      success: true,
      message: "The user has been deleted successfully.",
    });
  } catch (error) {
    next(error);
    return res.status(404).json({
      code: res.statusCode,
      success: false,
      message: "There is a system error occurred, please try it later again.",
      error: error.message,
    });
  }
};

module.exports = {
  createHandler,
  getAll,
  login,
  logout,
  getSingleUserTasks,
  updateHandler,
  deleteHandler,
};
