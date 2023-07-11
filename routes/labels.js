const express = require("express");
const router = express.Router();

const { create } = require("../controllers/label");

router.post("/", create);

module.exports = router;
