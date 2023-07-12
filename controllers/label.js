const Label = require("../models/label");

const createHandler = async (req, res, next) => {
  // get body
  const body = req.body;

  // create label
  const label = await Label.create({
    ...body,
  });

  return res.status(201).json({
    success: true,
    data: label,
  });
};

module.exports = {
  createHandler,
};
