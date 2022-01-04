'use strict';
let { v4 } = require('uuid');

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                type: Sequelize.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: v4(),
            },
            title: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
            price: {
                type: Sequelize.DECIMAL
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
        await queryInterface.dropTable('Products');
    }
};