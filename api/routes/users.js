const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const CampaignController = require("../controllers/CampaignController");
const auth = require("../middleware/auth");

// Users
// Get users list
router.get("/", UserController.getAllUsers);

// Get user by id
router.get("/:userId", UserController.getUserById);

// Create new user
router.post("/", UserController.createNewUser);

module.exports = router;
