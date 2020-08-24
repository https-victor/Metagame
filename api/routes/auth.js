const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const auth = require("../middleware/auth");

// Auth
// Sign In with email and password
router.post("/", AuthController.signIn);

// Get user data
router.get("/", auth, AuthController.getUser);

module.exports = router;
