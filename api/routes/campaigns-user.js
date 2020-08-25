const express = require("express");
const router = express.Router();
const CampaignController = require("../controllers/CampaignController");
const auth = require("../middleware/auth");

// Get all campaigns owned by user
router.get("/", auth, CampaignController.getAllCampaignsByGmId);

module.exports = router;
