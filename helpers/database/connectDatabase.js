const mongoose = require("mongoose");

// connect database by using mongoose
const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDb connection successful");
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectDatabase;
