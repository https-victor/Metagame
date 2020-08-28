const { Campaign, User } = require("../models");
const { Op, literal } = require("sequelize");
const player_campaign = require("../models/player_campaign");

module.exports = {
  // Get all campaigns
  async getAllCampaigns(req, res) {
    const { players, gm } = req.query;
    try {
      const campaigns = await Campaign.findAll({
        include: [
          ...(players == 1
            ? [
                {
                  association: "players",
                  required: false,
                  // where: { id: { [Op.ne]: { [Op.col]: "campaign.gmId" } } },
                  attributes: { exclude: ["password"] },
                  through: {
                    where: { state: 3 },
                    attributes: [],
                  },
                },
              ]
            : []),
          ...(gm == 1
            ? [
                {
                  association: "campaign_user",
                },
              ]
            : []),
        ],
        ...(gm == 1 ? { attributes: { exclude: ["gmId"] } } : {}),
      });
      return res.json(campaigns);
    } catch (error) {
      console.log(error);
    }
  },

  // Get all campaigns by gmId
  async getAllCampaignsByGmId(req, res) {
    // const { userId } = req.params;
    try {
      const user = await User.findByPk(req.user.id, {
        include: { association: "user_campaigns" },
      });
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      return res.json(user.campaigns);
    } catch (error) {
      console.log(error);
    }
  },

  // Get all adventures that a user is included
  async getAllAdventuresByUserId(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByPk(userId, {
        include: { association: "user_campaigns" },
      });
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      return res.json(user.campaigns);
    } catch (error) {
      console.log(error);
    }
  },

  // Get campaign by Id
  async getCampaignById(req, res) {
    const { campaignId } = req.params;
    try {
      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }

      return res.json(campaign);
    } catch (error) {
      console.log(error);
    }
  },

  // Create a new campaign
  async createNewCampaign(req, res) {
    const { name, description } = req.body;
    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const campaign = await Campaign.create({
        name,
        description,
        gmId: req.user.id,
      });
      // await user.addAdventure(campaign);
      return res.json(campaign);
    } catch (error) {
      console.log(error);
    }
  },

  // Player state ->
  // 0 - Not enrolled
  // 1 - Requested
  // 2 - Invited
  // 3 - Enrolled
  // 4 - Banned

  // // GM invites another user to join his campaign as player
  async inviteToEnrollOnCampaign(req, res) {
    const { campaignId, playerId } = req.params;

    try {
      const user = await User.findByPk(playerId);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!campaign.dataValues.gmId == req.user.id) {
        return res.status(400).json({
          error: "Only the GM has permission to accept an invitation",
        });
      }

      await user.addAdventure(campaign);
      const playerCampaign = await player_campaign.findOne({
        where: { playerId },
      });
      playerCampaign.state = 2;
      await playerCampaign.save();

      return res.status(200).json({
        status: "You successfully requested to enroll on this campaign",
      });
    } catch (error) {
      console.log(error);
    }
  },
  // // User accepts a GM's invitation to join his campaign as player
  async acceptInvitationToEnrollOnCampaign(req, res) {
    const { campaignId } = req.params;

    try {
      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      const playerCampaign = await player_campaign.findOne({
        where: { playerId: req.user.id, state: 2 },
      });
      if (!playerCampaign) {
        return res.status(400).json({
          error: "You're not invited to accept the invitation to enroll",
        });
      }
      playerCampaign.state = 3;
      await playerCampaign.save();

      return res.status(200).json({
        status: "You're now part of this adventure",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // // User refuses a GM's invitation to join his campaign as player
  async refuseInvitationToEnrollOnCampaign(req, res) {
    const { campaignId } = req.params;

    try {
      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      const playerCampaign = await player_campaign.findOne({
        where: { playerId: req.user.id, state: 2 },
      });
      if (!playerCampaign) {
        return res.status(400).json({
          error: "You're not invited to accept the invitation to enroll",
        });
      }
      await playerCampaign.destroy();

      return res.status(200).json({
        status: "You refused to join this campaign",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // Asks the GM if user can join his campaign
  async requestToEnrollOnCampaign(req, res) {
    const { campaignId } = req.params;

    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }

      await user.addAdventure(campaign);
      const playerCampaign = await player_campaign.findOne({
        where: { playerId: req.user.id },
      });
      playerCampaign.state = 1;
      await playerCampaign.save();

      return res.status(200).json({
        status: "You successfully requested to enroll on this campaign",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // // GM accepts someone's request to join his campaign
  async acceptRequestToEnroll(req, res) {
    const { campaignId, playerId } = req.params;

    try {
      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!campaign.dataValues.gmId == req.user.id) {
        return res.status(400).json({
          error: "Only the GM has permission to accept an invitation",
        });
      }
      const playerCampaign = await player_campaign.findOne({
        where: { playerId, state: 1 },
      });
      if (!playerCampaign) {
        return res.status(400).json({
          error: "This user didn't request to enroll on this campaign",
        });
      }
      playerCampaign.state = 3;
      await playerCampaign.save();

      return res.status(200).json({
        status: "This player is now allowed to play!",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // // GM refuses a user's request to join his campaign as player
  async refuseRequestToEnrollOnCampaign(req, res) {
    const { campaignId, playerId } = req.params;

    try {
      const campaign = await Campaign.findByPk(campaignId);

      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!campaign.dataValues.gmId == req.user.id) {
        return res.status(400).json({
          error: "Only the GM has permission to refuse an invitation",
        });
      }
      const playerCampaign = await player_campaign.findOne({
        where: { playerId, state: 1 },
      });
      if (!playerCampaign) {
        return res.status(400).json({
          error: "This user didn't request to enroll on this campaign",
        });
      }
      await playerCampaign.destroy();

      return res.status(200).json({
        status:
          "The user's request to join the campaign was refused successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
