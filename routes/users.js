const express = require("express");
const router = express.Router();

const { createHandler, getAll, login, logout } = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const {
  checkEmailExist,
} = require("../middlewares/database/databaseErrorHelpers");

router.get("/", getAll);
router.post("/", checkEmailExist, createHandler);
router.post("/login", login);
router.post("/logout", getAccessToRoute, logout);
// router.delete("/:taskId", deleteHandler);

module.exports = router;
