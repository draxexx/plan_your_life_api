const sendJwtToClient = (user, res) => {
  // generate JWT
  const token = user.generateJwtFromUser();

  const { JWT_COOKIE, NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE) * 1000 * 60),
      secure: NODE_ENV === "development" ? false : true,
    }) // create cookie, first parameter is key, second is variable
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
      },
    });
};

// checks is token is not null
const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

// get token from the header
const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;
  const access_token = authorization.split(" ")[1];
  return access_token;
};

module.exports = {
  sendJwtToClient,
  isTokenIncluded,
  getAccessTokenFromHeader,
};
