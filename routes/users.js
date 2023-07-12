const express = require("express");
const router = express.Router();

const { createHandler, getAll } = require("../controllers/user");

router.get("/", getAll);
router.post("/", createHandler);
// router.delete("/:taskId", deleteHandler);

module.exports = router;
