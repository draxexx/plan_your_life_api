const jwt = require("jsonwebtoken");

const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  // 401 unauthorized
  // 403 forbidden
  if (!isTokenIncluded(req)) {
    return res.status(401).json({
      code: res.statusCode,
      success: false,
      message: "You are not authorized to access this route",
    });
  }

  // get token
  const accessToken = getAccessTokenFromHeader(req);

  // verify the token
  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        code: res.statusCode,
        success: false,
        message: "You are not authorized to access this route",
      });
    }
    req.user = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  });
};

module.exports = {
  getAccessToRoute,
};
