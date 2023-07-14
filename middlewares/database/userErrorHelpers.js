const User = require("../../models/user");

const checkUserExist = async (req, res, next) => {
  try {
    // gets id from the params
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        code: res.statusCode,
        success: false,
        message: "There is no such user with that id.",
      });
    }

    // if there is no error, next to other controller
    next();
  } catch (error) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "There is no such user with that id.",
      error: error.message,
    });
  }
};

const checkEmailExist = async (req, res, next) => {
  // gets id from the params
  const { email } = req.body;

  // find user by id
  const user = await User.findOne({
    email: email,
  });

  // if user not exist
  if (user) {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "This email has been registered before.",
    });
  }

  // if there is no error, next to other controller
  next();
};

module.exports = {
  checkUserExist,
  checkEmailExist,
};
