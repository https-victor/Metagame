const { DataTypes } = require("sequelize");
const database = require("../database/index");
const { Campaign, User } = require(".");

const player_campaign = database.define("player_campaign", {
  playerId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
  campaignId: {
    type: DataTypes.INTEGER,
    references: {
      model: Campaign,
      key: "id",
    },
  },
  invited: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
  enrolled: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

module.exports = player_campaign;
