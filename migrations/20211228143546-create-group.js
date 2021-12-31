'use strict';
const { v4 } = require('uuid');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Groups', {
            id: {
                type: Sequelize.UUID,
                unique: true,
                primaryKey: true,
                isUUID: 4,
                defaultValue: v4()
            },
            name: {
                type: Sequelize.STRING
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Groups');
    }
};