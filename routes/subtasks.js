const express = require("express");
const router = express.Router();

const { createHandler, getAll } = require("../controllers/subtask");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAll);
router.post("/", getAccessToRoute, createHandler);

module.exports = router;
