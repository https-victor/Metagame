const { DataTypes } = require("sequelize");
const database = require("../database/index");
const { Campaign, User } = require(".");

const player_campaign = database.define(
  "player_campaign",
  {
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
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  { freezeTableName: true, tableName: "player_campaign" }
);

module.exports = player_campaign;
