const { DataTypes } = require("sequelize");
const database = require("../database/index");

const Pc = database.define("pc", {
  name: {
    type: DataTypes.STRING,
  },
  hp: {
    type: DataTypes.INTEGER,
  },
  guid: {
    type: DataTypes.STRING,
  },
  maxHp: {
    type: DataTypes.INTEGER,
  },
  bio: {
    type: DataTypes.STRING,
  },
  class: {
    type: DataTypes.STRING,
  },
});

module.exports = Pc;
