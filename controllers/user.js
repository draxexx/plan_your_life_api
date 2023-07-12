const User = require("../models/user");

const createHandler = async (req, res, next) => {
  // get body
  const body = req.body;

  // create user
  const user = await User.create({
    ...body,
  });

  return res.status(201).json({
    success: true,
    data: user,
  });
};

const getAll = async (req, res, next) => {
  // gets all tasks
  const users = await User.find().populate(["tasks"]);

  return res.status(200).json({
    success: true,
    data: users,
  });
};

module.exports = {
  createHandler,
  getAll,
};
