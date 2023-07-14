const express = require("express");
const router = express.Router();

const {
  createHandler,
  deleteHandler,
  updateHandler,
} = require("../controllers/label");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkLabelInputs } = require("../middlewares/input/inputHelpers");
const {
  checkLabelExist,
  checkLabelExistById,
  checkThisLabelHasTask,
} = require("../middlewares/database/labelErrorHelpers");

router.post(
  "/",
  [getAccessToRoute, checkLabelInputs, checkLabelExist],
  createHandler
);
router.delete(
  "/:id",
  [getAccessToRoute, checkLabelExistById, checkThisLabelHasTask],
  deleteHandler
);
router.put("/:id", [getAccessToRoute, checkLabelExistById], updateHandler);

module.exports = router;
