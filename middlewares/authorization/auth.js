const jwt = require("jsonwebtoken");

const CustomError = require("../../helpers/error/CustomError");
const {
  isTokenIncluded,
  getAccessTokenFromHeader,
} = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, res, next) => {
  const { JWT_SECRET_KEY } = process.env;

  // 401 unauthorized
  // 403 forbidden
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this route", 401)
    );
  }

  // get token
  const accessToken = getAccessTokenFromHeader(req);

  // verify the token
  jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this route", 401)
      );
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
