const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/CampaignController");
const auth = require("../middleware/auth");

// Get campaigns list
router.get("/", CampaignController.getAllCampaigns);

// Get campaigns by id
router.get("/:campaignId", CampaignController.getCampaignById);

// Create new campaign
router.post("/", auth, CampaignController.createNewCampaign);

// Enroll on campaign
router.post("/enroll/:campaignId", auth, CampaignController.enrollOnCampaign);

module.exports = router;
