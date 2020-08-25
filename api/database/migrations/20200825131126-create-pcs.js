"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("pcs", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      guid: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      maxHp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      class: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Warrior",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pcs");
  },
};
