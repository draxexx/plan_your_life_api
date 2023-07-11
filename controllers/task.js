const Task = require("../models/task");

const addTask = async (req, res, next) => {
  // get body
  const body = req.body;

  // create question
  const task = await Task.create({
    ...body,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
};

module.exports = {
  addTask,
};
