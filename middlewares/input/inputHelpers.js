const checkUserInputs = async (req, res, next) => {
  const body = req.body;

  if (typeof body.name === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a name.",
    });
  }

  if (typeof body.email === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a email.",
    });
  }

  if (typeof body.password === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a password.",
    });
  }

  next();
};

const checkTaskInputs = async (req, res, next) => {
  const body = req.body;

  if (typeof body.title === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a title.",
    });
  }

  if (typeof body.priority === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a priority.",
    });
  }

  if (typeof body.label === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a label.",
    });
  }

  if (typeof body.user === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a user.",
    });
  }

  next();
};

const checkLabelInputs = async (req, res, next) => {
  const body = req.body;

  if (typeof body.title === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a title.",
    });
  }

  if (typeof body.user === "undefined") {
    return res.status(400).json({
      code: res.statusCode,
      success: false,
      message: "Please enter a user.",
    });
  }

  next();
};

module.exports = { checkUserInputs, checkTaskInputs, checkLabelInputs };
