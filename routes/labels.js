const express = require("express");
const router = express.Router();

const { createHandler } = require("../controllers/label");

router.post("/", createHandler);

module.exports = router;
