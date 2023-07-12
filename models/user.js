const mongoose = require("mongoose");

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
});

// export this model
module.exports = mongoose.model("User", UserSchema);
