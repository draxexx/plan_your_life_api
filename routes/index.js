const express = require("express");

// routers
const tasks = require("./tasks");

const router = express.Router();

router.use("/tasks", tasks);

module.exports = router;
