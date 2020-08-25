const express = require("express");
const router = express.Router();
const PcsController = require("../controllers/PcsController");
const auth = require("../middleware/auth");

// Get all pcs linked to a campaign
// router.get("/", auth, PcsController.getAllPcsByCampaignId);

// Unlink all pcs linked to a campaign
// router.delete("/", PcsController.unlinkAllPcsByCampaignId);

// Create a unlinked new PC
router.post("/", auth, PcsController.createNewPc);

// // Get a PC
// router.get("/:pcId", auth, PcsController.getPc);

// // Edit a PC
// router.put("/:pcId", auth, PcsController.editPc);

// // Delete a PC
// router.delete("/:pcId", auth, PcsController.deletePc);

// // Link a pc to a campaign
// router.post("/:pcId/campaigns/:campaignId", auth, PcsController.linkPc);

// // Unlink pc from campaign
// router.get("/:pcId/campaigns/:campaignId", auth, PcsController.unlinkPc);

// // Unlink PC from all campaigns
// router.delete("/:pcId/unlink", auth, PcsController.unlinkPcFromAll);

// // Get all PCs owned by user by Campaign
// router.get("/campaigns/:campaignId", auth, PcsController.getAllPcsByUserIdAndCampaignId);

// Create a new PC and link to Campaign
router.post("/campaigns/:campaignId", auth, PcsController.createAndLinkNewPc);

// // Unlink all PCs owned by user on campaign
// router.delete("/campaigns/:campaignId", auth, PcsController.unlinkAllPcs);

module.exports = router;
