'use strict';
const { v4 } = require("uuid");
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Rooms', {
            id: {
                type: Sequelize.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: v4(),
            },
            room_name: {
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
        await queryInterface.dropTable('Rooms');
    }
};