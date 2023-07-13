const express = require("express");
const router = express.Router();

const { createHandler, getAll, deleteHandler } = require("../controllers/task");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAll);
router.post("/", getAccessToRoute, createHandler);
router.delete("/:taskId", getAccessToRoute, deleteHandler);

module.exports = router;
