const Subtask = require("../models/subtask");

const createHandler = async (req, res, next) => {
  try {
    // get body
    const body = req.body;

    // create subtasktask
    const subtask = await Subtask.create({
      ...body,
    });

    return res.status(201).json({
      success: true,
      data: subtask,
      message: "The subtask has been created successfully.",
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
    const subtasks = await Subtask.find();

    return res.status(200).json({
      code: res.statusCode,
      success: true,
      data: subtasks,
      message: "Subtasks fetched successfully.",
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
