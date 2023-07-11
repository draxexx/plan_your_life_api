const express = require("express");
const router = express.Router();

const { createHandler, getAll, deleteHandler } = require("../controllers/task");

router.get("/", getAll);
router.post("/", createHandler);
router.delete("/:taskId", deleteHandler);

module.exports = router;
