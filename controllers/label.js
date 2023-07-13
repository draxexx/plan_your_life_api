const Label = require("../models/label");
const User = require("../models/user");

const createHandler = async (req, res, next) => {
  try {
    // get body
    const body = req.body;

    // create label
    const label = await Label.create({
      ...body,
    });

    const user = await User.findById(body.user);

    console.log(body.user);

    user.labels.push(label);
    await user.save();

    return res.status(201).json({
      code: res.statusCode,
      success: true,
      data: label,
      message: "The label has been created successfully.",
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
};
