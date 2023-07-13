const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String, // type of the variable
    required: [true, "Please provide a name"], // this variable must be filled
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true, // this variable must be unique
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ], // we define regex for email
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with min length 6"],
    required: [true, "Please provide a password"],
    select: false, // when we get the data, password variable will not be shown
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  tasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Task",
    },
  ],
  labels: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Label",
    },
  ],
});

UserSchema.methods.generateJwtFromUser = function () {
  // get JWT_SECRET_KEY and JWT_EXPIRE from the .env
  const { JWT_SECRET_KEY, JWT_EXPIRE } = process.env;

  const payload = {
    id: this._id,
    email: this.email,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE,
  });

  return token;
};

UserSchema.pre("save", function (next) {
  // if password doesn't update
  if (!this.isModified("password")) {
    next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    // to handle error
    if (err) next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      // to handle error
      if (err) next(err);

      // we assign hashed password to user's password
      this.password = hash;
      next();
    });
  });
});

// export this model
module.exports = mongoose.model("User", UserSchema);
