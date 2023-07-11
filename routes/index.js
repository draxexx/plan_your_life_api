const express = require("express");

// routers
const tasks = require("./tasks");
const labels = require("./labels");

const router = express.Router();

router.use("/labels", labels);

module.exports = router;
