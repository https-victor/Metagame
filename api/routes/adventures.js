const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/CampaignController");
const auth = require("../middleware/auth");

// // Get all campaigns owned by user
// router.get("/campaigns", auth, CampaignController.getAllCampaignsByGmId);
// // Add a new campaign on given user
// router.post("/campaigns", CampaignController.createNewCampaign);

// router.get("/adventures", CampaignController.getAllAdventuresByUserId);

// Enroll in an adventure by campaign Id
// router.post("/:campaignId", auth, CampaignController.enrollOnCampaign);

module.exports = router;
