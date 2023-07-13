const express = require("express");
const router = express.Router();

const { createHandler } = require("../controllers/label");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.post("/", getAccessToRoute, createHandler);

module.exports = router;
