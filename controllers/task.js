const Task = require("../models/task");
const Subtask = require("../models/subtask");

const createHandler = async (req, res, next) => {
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
    success: true,
    data: task,
  });
};

const getAll = async (req, res, next) => {
  // gets all tasks
  const tasks = await Task.find().populate(["label", "subtasks"]);

  return res.status(200).json({
    success: true,
    data: tasks,
  });
};

const deleteHandler = async (req, res, next) => {
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
    message: "Task deleted successfully",
  });
};

module.exports = {
  createHandler,
  getAll,
  deleteHandler,
};
