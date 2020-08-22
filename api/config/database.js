const keys = require("../keys");

module.exports = {
  dialect: "mysql",
  host: keys.HOST,
  username: keys.USER,
  password: keys.PWD,
  database: keys.DB,
  operatorsAliases: 1,
  define: {
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
