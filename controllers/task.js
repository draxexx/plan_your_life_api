const Task = require("../models/task");
const Subtask = require("../models/subtask");
const User = require("../models/user");
const Label = require("../models/label");

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

    const user = await User.findById(body.user);

    user.tasks.push(task);
    await user.save();

    const label = await Label.findById(body.label);

    label.tasks.push(task);
    await label.save();

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
    const tasks = await Task.find().populate(["label", "subtasks", "user"]);

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
    const { id } = req.params;

    const task = await Task.findById(id);

    if (typeof task.subtasks !== "undefined") {
      for (let index = 0; index < task.subtasks.length; index++) {
        const element = task.subtasks[index];

        await Subtask.findByIdAndRemove(element);
      }
    }

    await Task.findByIdAndRemove(id);

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

const updateHandler = async (req, res, next) => {
  try {
    // get task id
    const { id } = req.params;

    const {
      title,
      label,
      user,
      priority,
      description,
      startTime,
      endTime,
      reminder,
      status,
    } = req.body;

    const task = await Task.findById(id);

    typeof title !== "undefined" ? (task.title = title) : "";
    typeof label !== "undefined" ? (task.label = label) : "";
    typeof user !== "undefined" ? (task.user = user) : "";
    typeof priority !== "undefined" ? (task.priority = priority) : "";
    typeof description !== "undefined" ? (task.description = description) : "";
    typeof startTime !== "undefined" ? (task.startTime = startTime) : "";
    typeof endTime !== "undefined" ? (task.endTime = endTime) : "";
    typeof reminder !== "undefined" ? (task.reminder = reminder) : "";
    typeof status !== "undefined" ? (task.status = status) : "";
    await task.save();

    return res.status(200).json({
      success: true,
      message: "The task has been updated successfully.",
      data: task,
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
  updateHandler,
};
