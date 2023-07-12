const bcrypt = require("bcryptjs");

// checks both email and password are not null
const validateUserInput = (email, password) => {
  return email && password;
};

// compares the password with the hashedPassword
const comparePassword = (password, hashedPassword) => {
  // 'bcrypt.compareSync' function, compares given password with the hashed password
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  validateUserInput,
  comparePassword,
};
