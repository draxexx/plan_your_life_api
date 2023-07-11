const express = require("express");
const router = express.Router();

const { create, getAll } = require("../controllers/subtask");

router.get("/", getAll);
router.post("/", create);

module.exports = router;
