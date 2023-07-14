const Task = require("../../models/task");

const checkTaskExist = async (req, res, next) => {
  try {
    // gets id from the params
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "There is no such task with that id.",
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
  checkTaskExist,
};
