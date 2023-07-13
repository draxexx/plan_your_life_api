const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Task model
const SubtaskSchema = new Schema({
  title: {
    type: String, // type of the variable
    required: [true, "Please provide a title"], // this variable must be filled
  },
  order: {
    type: Number,
    required: [true, "Please provide a order"],
  },
  status: {
    type: Number,
  },
  task: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "Task",
  },
});

// export this model
module.exports = mongoose.model("Subtask", SubtaskSchema);
