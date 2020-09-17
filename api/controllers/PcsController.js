const { Op } = require("sequelize");
const { Campaign } = require("../models");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const keys = require("../keys");
const Pc = require("../models/Pc");

module.exports = {
  // Create a new player character
  async createNewPc(req, res) {
    const { name, bio, class: classPc, maxHp, guid } = req.body;

    // Validation of form data
    if (!name) {
      return res
        .status(400)
        .json({ error: { msg: "Please enter all fields!" } });
    }
    let otherValues = {};
    if (bio) otherValues.bio = bio;
    if (classPc) otherValues.class = classPc;
    if (guid) otherValues.guid = guid;
    if (maxHp) {
      otherValues.hp = maxHp;
      otherValues.maxHp = maxHp;
    }

    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const pc = await Pc.create({
        name,
        guid: "guid",
        playerId: req.user.id,
        ...otherValues,
      });
      return res.json(pc);
    } catch (error) {
      console.log(error);
    }
  },

  //
  async createAndLinkNewPc(req, res) {
    const { name, bio, class: classPc, maxHp, guid } = req.body;
    const { campaignId } = req.params;

    // Validation of form data
    if (!name) {
      return res
        .status(400)
        .json({ error: { msg: "Please enter all fields!" } });
    }
    let otherValues = {};
    if (bio) otherValues.bio = bio;
    if (classPc) otherValues.class = classPc;
    if (guid) otherValues.guid = guid;
    if (maxHp) {
      otherValues.hp = maxHp;
      otherValues.maxHp = maxHp;
    }

    try {
      const user = await User.findByPk(req.user.id);

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      const campaign = await Campaign.findByPk(campaignId);

      const players = await Campaign.findByPk(campaignId, {
        include: [
          {
            association: "players",
            required: true,
            where: { id: req.user.id },
            through: { where: { state: 3 }, attributes: [] },
          },
        ],
      });
      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!players) {
        return res.status(400).json({
          error: "You're not enrolled in this adventure",
        });
      }

      const pc = await Pc.create({
        name,
        guid: "guid",
        playerId: req.user.id,
        ...otherValues,
      });

      await campaign.addPc(pc);
      return res.json(pc);
    } catch (error) {
      console.log(error);
    }
  },
  //
  async linkPcToCampaign(req, res) {
    const { pcId, campaignId } = req.params;

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      //
      const pc = await Pc.findByPk(pcId);
      if (!pc) {
        return res.status(400).json({
          error: "Player Character not found",
        });
      }

      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!(await campaign.hasPlayer(user))) {
        return res.status(400).json({
          error: "User not enrolled on this campaign",
        });
      }
      if (await campaign.hasPc(pc)) {
        return res.status(400).json({
          error: "This Player Character is already linked to this campaign",
        });
      }
      //

      await campaign.addPc(pc);
      return res.json(pc);
    } catch (error) {
      console.log(error);
    }
  },

  async unlinkPcToCampaign(req, res) {
    const { pcId, campaignId } = req.params;

    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      const pc = await Pc.findByPk(pcId);
      if (!pc) {
        return res.status(400).json({
          error: "Player Character not found",
        });
      }

      const campaign = await Campaign.findByPk(campaignId);
      if (!campaign) {
        return res.status(400).json({
          error: "Campaign not found",
        });
      }
      if (!(await campaign.hasPlayer(user))) {
        return res.status(400).json({
          error: "User not enrolled on this campaign",
        });
      }
      if (!(await campaign.hasPc(pc))) {
        return res.status(400).json({
          error: "This Player Character is not linked to this campaign",
        });
      }

      await campaign.removePc(pc);
      return res.status(200).json({
        status: "Player character unlinked successfully",
      });
    } catch (error) {
      console.log(error);
    }
  },
  async ttsConfiguration(req, res) {
    var socket = req.app.get("socketIo");

    const { pcId } = req.params;
    const { hp, setHp, setMax } = req.body;
    try {
      const pc = await Pc.findByPk(pcId);
      if (!pc) {
        return res.status(400).json({
          error: "Player Character not found",
        });
      }

      if (hp > 0) {
        if (!(pc.hp + Math.abs(hp) > pc.maxHp)) {
          pc.hp = pc.hp + Math.abs(hp);
        } else {
          pc.hp = pc.maxHp;
        }
      } else if (hp < 0) {
        pc.hp = pc.hp - Math.abs(hp);
      }
      if (setHp) {
        if (setHp != pc.hp) {
          pc.hp = setHp;
        }
      }
      if (setMax) {
        if (setMax != pc.maxHp) {
          pc.maxHp = setMax;
        }
      }
      socket.emit("updateHP", pc.dataValues);
      await pc.save();
      return res.status(200).json({
        status: "Ok!",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
