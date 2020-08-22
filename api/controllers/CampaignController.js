const { Campaign, User } = require("../models");
const { Op, literal } = require("sequelize");

Campaign;
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
                  where: { id: { [Op.ne]: { [Op.col]: "campaign.gmId" } } },
                  through: { attributes: [] },
                },
              ]
            : []),
          ...(gm == 1
            ? [
                {
                  association: "gm",
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
        include: { association: "campaigns" },
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
        include: { association: "campaigns" },
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
    const { userId } = req.params;
    const { name, description } = req.body;
    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const campaign = await Campaign.create({
        name,
        description,
        gmId: userId,
      });
      // await user.addAdventure(campaign);
      return res.json(campaign);
    } catch (error) {
      console.log(error);
    }
  },
};
