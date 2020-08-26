const User = require("./User");
const Campaign = require("./Campaign");
const Pc = require("./Pc");
const player_campaign = require("./player_campaign");

// User - Campaign
User.hasMany(Campaign, { foreignKey: "gmId", as: "user_campaigns" });
Campaign.belongsTo(User, { foreignKey: "gmId", as: "campaign_user" });

// Campaigns - Users
Campaign.belongsToMany(User, {
  as: "players",
  through: player_campaign,
  foreignKey: "campaignId",
});
User.belongsToMany(Campaign, {
  as: "adventures",
  through: player_campaign,
  foreignKey: "playerId",
});

// PCs - Users
Pc.belongsTo(User, { foreignKey: "playerId", as: "pc_user" });
User.hasMany(Pc, { foreignKey: "playerId", as: "player_pcs" });

// PCs - Campaigns
Pc.belongsToMany(Campaign, {
  as: "campaigns",
  through: "pc_campaign",
  foreignKey: "pcId",
});
Campaign.belongsToMany(Pc, {
  as: "pcs",
  through: "pc_campaign",
  foreignKey: "campaignId",
});

module.exports = {
  User,
  Campaign,
};
