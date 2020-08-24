const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/CampaignController");
const auth = require("../middleware/auth");

// Get campaigns list
router.get("/", CampaignController.getAllCampaigns);

// Get campaigns by id
router.get("/:campaignId", CampaignController.getCampaignById);

module.exports = router;
