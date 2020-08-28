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

// Request to enroll on campaign
router.post(
  "/:campaignId/request",
  auth,
  CampaignController.requestToEnrollOnCampaign
);

// Accept user's request
router.post(
  "/:campaignId/accept/:playerId",
  auth,
  CampaignController.acceptRequestToEnroll
);

// Invite user to join campaign
router.post(
  "/:campaignId/invite/:playerId",
  auth,
  CampaignController.inviteToEnrollOnCampaign
);

// Refuse invitation to enroll on the campaign
router.post(
  "/:campaignId/accept",
  auth,
  CampaignController.acceptInvitationToEnrollOnCampaign
);

// Accept invitation to enroll on campaign
router.post(
  "/:campaignId/refuse",
  auth,
  CampaignController.refuseInvitationToEnrollOnCampaign
);

// GM refuse user invitation
router.post(
  "/:campaignId/refuse/:playerId",
  auth,
  CampaignController.refuseRequestToEnrollOnCampaign
);

module.exports = router;
