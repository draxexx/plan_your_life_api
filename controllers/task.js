const Task = require("../models/task");
const Subtask = require("../models/subtask");

const create = async (req, res, next) => {
  // get body
  const body = req.body;

  let subtaskIds = [];

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

  res.status(200).json({
    success: true,
    data: task,
  });
};

const getAll = async (req, res, next) => {
  // gets all tasks
  const tasks = await Task.find().populate(["label", "subtasks"]);

  res.status(200).json({
    success: true,
    data: tasks,
  });
};

module.exports = {
  create,
  getAll,
};
