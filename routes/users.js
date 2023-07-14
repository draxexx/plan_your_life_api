const express = require("express");
const router = express.Router();

const {
  createHandler,
  getAll,
  login,
  logout,
  getSingleUserTasks,
  updateHandler,
} = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkEmailExist,
  checkUserExist,
} = require("../middlewares/database/userErrorHelpers");
const { checkUserInputs } = require("../middlewares/input/inputHelpers");

router.get("/", getAll);
router.get(
  "/:id/tasks",
  [getAccessToRoute, checkUserExist],
  getSingleUserTasks
);
router.post("/", [checkUserInputs, checkEmailExist], createHandler);
router.post("/login", login);
router.post("/logout", getAccessToRoute, logout);
router.put("/:id", [getAccessToRoute, checkUserExist], updateHandler);
// router.delete("/:taskId", deleteHandler);

module.exports = router;
