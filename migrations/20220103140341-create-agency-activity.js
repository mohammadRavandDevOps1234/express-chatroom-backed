'use strict';
const { v4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AgencyActivities', {
      id: {
        type: Sequelize.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: v4(),
    },
    AgencyId: {
      type: Sequelize.UUID,
      references: {
          model: 'Agencies',
          key: 'id',
      },
    },
      province: {
        type: Sequelize.INTEGER
      },
      city: {
        type: Sequelize.INTEGER
      },
      region: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AgencyActivities');
  }
};