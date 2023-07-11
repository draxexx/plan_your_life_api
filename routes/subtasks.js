const express = require("express");
const router = express.Router();

const { createHandler, getAll } = require("../controllers/subtask");

router.get("/", getAll);
router.post("/", createHandler);

module.exports = router;
