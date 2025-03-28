const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/login", UserController.login);
router.get("/:id", UserController.getUser);
router.post("/signUp", UserController.signUp);

module.exports = router;
