const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const CampaignController = require("../controllers/CampaignController");

// Users
// Get users list
router.get("/", UserController.getAllUsers);

// Get user by id
router.get("/:userId", UserController.getUserById);

// Create new user
router.post("/", UserController.createNewUser);

//  Contained by User
// Get all campaigns owned by user
router.get("/:userId/campaigns", CampaignController.getAllCampaignsByGmId);
// Add a new campaign on given user
router.post("/:userId/campaigns", CampaignController.createNewCampaign);

router.get("/:userId/adventures", CampaignController.getAllAdventuresByUserId);

module.exports = router;
