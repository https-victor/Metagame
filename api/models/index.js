const User = require("./User");
const Campaign = require("./Campaign");

Campaign.belongsToMany(User, {
  as: "players",
  through: "games",
  foreignKey: "campaignId",
});

User.hasMany(Campaign, { foreignKey: "gmId", as: "campaigns" });
Campaign.belongsTo(User, { foreignKey: "gmId", as: "gm" });

User.belongsToMany(Campaign, {
  as: "adventures",
  through: "games",
  foreignKey: "playerId",
});

module.exports = {
  User,
  Campaign,
};
