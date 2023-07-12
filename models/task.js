const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Task model
const TaskSchema = new Schema({
  title: {
    type: String, // type of the variable
    required: [true, "Please provide a title"], // this variable must be filled
  },
  label: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Label", // give reference to the user model
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User", // give reference to the user model
  },
  subtasks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Subtask",
    },
  ],
  priority: {
    type: Number,
    required: [true, "Please provide a priority"],
  },
  description: {
    type: String, // type of the variable
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  reminder: {
    type: Date,
  },
  status: {
    type: Number,
  },
});

// export this model
module.exports = mongoose.model("Task", TaskSchema);
