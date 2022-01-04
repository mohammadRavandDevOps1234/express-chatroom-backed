"use strict";
const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Agencies", {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: v4(),
      },
      CompanyId: {
        type: Sequelize.UUID,
        references: {
          model: "Companies",
          key: "id",
        },
        unique: true,
      },
      agency_name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Agencies");
  },
};
