const express = require("express");
const router = express.Router();

const { createHandler, getAll, login, logout } = require("../controllers/user");
const { getAccessToRoute } = require("../middlewares/authorization/auth");

router.get("/", getAll);
router.post("/", createHandler);
router.post("/login", login);
router.post("/logout", getAccessToRoute, logout);
// router.delete("/:taskId", deleteHandler);

module.exports = router;
