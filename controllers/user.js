const User = require("../models/user");

const createHandler = async (req, res, next) => {
  try {
    // get body
    const body = req.body;

    // create user
    const user = await User.create({
      ...body,
    });

    return res.status(201).json({
      success: true,
      data: user,
      message: "The user has been created successfully.",
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
    const users = await User.find().populate(["tasks"]);

    return res.status(200).json({
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

module.exports = {
  createHandler,
  getAll,
};
