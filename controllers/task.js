const Task = require("../models/task");
const Subtask = require("../models/subtask");

const createHandler = async (req, res, next) => {
  try {
    // get body
    const body = req.body;

    let subtaskIds = [];

    // check if subtasks of the body are undefined
    if (typeof body.subtasks !== "undefined") {
      for (let i = 0; i < body.subtasks.length; i++) {
        //create subtasks
        const subtask = await Subtask.create({
          ...body.subtasks[i],
        });

        subtaskIds.push(subtask.id);
      }
    }

    // create task
    const task = await Task.create({
      ...body,
      subtasks: subtaskIds,
    });

    return res.status(201).json({
      code: res.statusCode,
      success: true,
      data: task,
      message: "The task has been created successfully.",
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
    const tasks = await Task.find().populate(["label", "subtasks"]);

    return res.status(200).json({
      code: res.statusCode,
      success: true,
      data: tasks,
      message: "Tasks fetched successfully.",
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
    const { taskId } = req.params;

    const task = await Task.findById(taskId);

    if (typeof task.subtasks !== "undefined") {
      for (let index = 0; index < task.subtasks.length; index++) {
        const element = task.subtasks[index];

        await Subtask.findByIdAndRemove(element);
      }
    }

    await Task.findByIdAndRemove(taskId);

    return res.status(200).json({
      success: true,
      message: "The task has been deleted successfully.",
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
  deleteHandler,
};
