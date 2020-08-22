const { DataTypes } = require("sequelize");
const database = require("../database/index");

const Campaign = database.define("campaign", {
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
});

module.exports = Campaign;
