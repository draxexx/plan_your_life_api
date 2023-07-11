const Task = require("../models/task");

const create = async (req, res, next) => {
  // get body
  const body = req.body;

  // create task
  const task = await Task.create({
    ...body,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
};

module.exports = {
  create,
};
