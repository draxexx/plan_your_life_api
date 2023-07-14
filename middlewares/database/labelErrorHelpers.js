const Label = require("../../models/label");
const Task = require("../../models/task");
const User = require("../../models/user");

const checkLabelExistById = async (req, res, next) => {
  try {
    // gets id from the params
    const { id } = req.params;

    const label = await Label.findById(id);

    if (!label) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "There is no such label with that id.",
      });
    }

    // if there is no error, next to other controller
    next();
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "There is no such label with that id.",
      error: error.message,
    });
  }
};

const checkLabelExist = async (req, res, next) => {
  // gets id from the params
  const { title, user } = req.body;

  // find user by id
  const label = await Label.findOne({
    title: title,
    user: user,
  });

  // if user not exist
  if (label) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "This label has been registered before.",
    });
  }

  // if there is no error, next to other controller
  next();
};

const checkThisLabelHasTask = async (req, res, next) => {
  try {
    // gets id from the params
    const { id } = req.params;

    const tasks = await Task.find({
      label: id,
    });

    if (tasks.length > 0) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "This label can not be deleted because it has some tasks.",
      });
    }

    // if there is no error, next to other controller
    next();
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "This label can not be deleted because it has some tasks.",
      error: error.message,
    });
  }
};

const checkRelatedDataExist = async (req, res, next) => {
  try {
    // gets id from the params
    const { user } = req.body;

    const userDB = await User.findById(user);

    if (!userDB) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "There is no such user with that id.",
      });
    }
    // if there is no error, next to other controller
    next();
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "There is no such task with that id.",
      error: error.message,
    });
  }
};

module.exports = {
  checkLabelExist,
  checkLabelExistById,
  checkThisLabelHasTask,
  checkRelatedDataExist,
};
