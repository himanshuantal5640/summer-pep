const express = require("express");
const router = express.Router();
const { signupUser, loginUser } = require("../controllers/authController");

// Route to register a new user
router.post("/signup", signupUser);

// Route to authenticate a user
router.post("/login", loginUser);

module.exports = router;
