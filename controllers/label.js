const Label = require("../models/label");

const create = async (req, res, next) => {
  // get body
  const body = req.body;

  // create label
  const label = await Label.create({
    ...body,
  });

  res.status(200).json({
    success: true,
    data: label,
  });
};

module.exports = {
  create,
};
