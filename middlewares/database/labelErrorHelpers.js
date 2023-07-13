const Label = require("../../models/label");

const checkLabelExist = async (req, res, next) => {
  // gets id from the params
  const { title, user } = req.body;

  // find user by id
  const label = await Label.findOne({
    title: title,
    user: user,
  });

  // if user not exist
  if (label) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "This label has been registered before.",
    });
  }

  // if there is no error, next to other controller
  next();
};

module.exports = {
  checkLabelExist,
};
