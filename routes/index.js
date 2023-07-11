const express = require("express");

// routers
const tasks = require("./tasks");
const labels = require("./labels");
const subtasks = require("./subtasks");

const router = express.Router();

router.use("/tasks", tasks);
router.use("/labels", labels);
router.use("/subtasks", subtasks);

module.exports = router;
