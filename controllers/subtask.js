const Subtask = require("../models/subtask");

const create = async (req, res, next) => {
  // get body
  const body = req.body;

  // create subtasktask
  const subtask = await Subtask.create({
    ...body,
  });

  res.status(200).json({
    success: true,
    data: subtask,
  });
};

const getAll = async (req, res, next) => {
  // gets all tasks
  const subtasks = await Subtask.find();

  res.status(200).json({
    success: true,
    data: subtasks,
  });
};

module.exports = {
  create,
  getAll,
};
