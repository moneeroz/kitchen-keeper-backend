const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Register user
router.post("/register", userController.register);
// Login user
router.post("/login", userController.login);

module.exports = router;
