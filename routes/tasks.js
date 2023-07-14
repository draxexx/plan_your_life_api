const express = require("express");
const router = express.Router();

const {
  createHandler,
  getAll,
  deleteHandler,
  updateHandler,
} = require("../controllers/task");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkTaskInputs } = require("../middlewares/input/inputHelpers");
const {
  checkTaskExist,
  checkRelatedDataExist,
} = require("../middlewares/database/taskErrorHelpers");

router.get("/", getAll);
router.post(
  "/",
  [getAccessToRoute, checkTaskInputs, checkRelatedDataExist],
  createHandler
);
router.put("/:id", [getAccessToRoute, checkTaskExist], updateHandler);
router.delete("/:id", [getAccessToRoute, checkTaskExist], deleteHandler);

module.exports = router;
