const { DataTypes } = require("sequelize");
const database = require("../database/index");
const { Campaign, Pc } = require(".");

const pc_campaign = database.define(
  "pc_campaign",
  {
    pcId: {
      type: DataTypes.INTEGER,
      references: {
        model: Pc,
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
  },
  { freezeTableName: true, tableName: "pc_campaign" }
);

module.exports = pc_campaign;
