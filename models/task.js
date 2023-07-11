const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Task model
const TaskSchema = new Schema({
  title: {
    type: String, // type of the variable
    required: [true, "Please provide a title"], // this variable must be filled
  },
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
