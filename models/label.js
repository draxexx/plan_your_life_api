const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create Task model
const LabelSchema = new Schema({
  title: {
    type: String, // type of the variable
    required: [true, "Please provide a label"], // this variable must be filled
  },
});

// export this model
module.exports = mongoose.model("Label", LabelSchema);
