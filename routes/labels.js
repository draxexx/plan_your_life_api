const express = require("express");
const router = express.Router();

const { createHandler } = require("../controllers/label");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkLabelInputs } = require("../middlewares/input/inputHelpers");
const {
  checkLabelExist,
} = require("../middlewares/database/labelErrorHelpers");

router.post(
  "/",
  [getAccessToRoute, checkLabelInputs, checkLabelExist],
  createHandler
);

module.exports = router;
