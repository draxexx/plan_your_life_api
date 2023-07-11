const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

const connectDatabase = require("./helpers/database/connectDatabase");

dotenv.config();

app.use(express.json({ limit: "10mb" }));

// MongoDb Connection
connectDatabase();

// routers
const routers = require("./routes/index");

// middlewares

// routes
app.use("/api/v2", routers);

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

console.log("ENVIRONMENT:", process.env.NODE_ENV);
