const { DataTypes } = require("sequelize");
const database = require("../database/index");

const User = database.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ["password"] },
      },
    },
  }
);

module.exports = User;
