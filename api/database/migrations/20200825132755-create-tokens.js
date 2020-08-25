"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("pc_campaign", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pcId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "pcs", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      campaignId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "campaigns", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pc_campaign");
  },
};
