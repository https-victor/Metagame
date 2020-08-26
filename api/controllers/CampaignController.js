const { Campaign, User } = require("../models");
const { Op, literal } = require("sequelize");

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
                  through: { attributes: [] },
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

  // // GM invites another user to join his campaign as player
  // async inviteToEnrollOnCompaign(req, res) {
  // },
  // // User accepts a GM's invitation to join his campaign as player
  // async acceptInvitationToEnrollOnCompaign(req, res) {
  // },

  // Asks the GM if user can join his campaign
  async enrollOnCampaign(req, res) {
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

      const test = await user.addAdventure(campaign);
      return res.json(test);
    } catch (error) {
      console.log(error);
    }
  },

  // // GM accepts someone's request to join his campaign
  // async acceptRequestToEnroll(req, res) {
  // },
};
