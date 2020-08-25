"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("player_campaign", "invited", {
        type: Sequelize.TINYINT(1),
        defaultValue: 1,
      }),
      queryInterface.addColumn("player_campaign", "enrolled", {
        type: Sequelize.TINYINT(1),
        defaultValue: 0,
      }),
    ]);
  },

  down: (queryInterface) => {
    return Promise.all([
      queryInterface.removeColumn("player_campaign", "invited"),
      queryInterface.removeColumn("player_campaign", "enrolled"),
    ]);
  },
};
