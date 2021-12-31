'use strict';
const { v4 } = require("uuid");
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Stores', {
            id: {
                type: Sequelize.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: v4(),
            },
            UserId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                unique:true
            },
            store_name: {
                type: Sequelize.STRING
            },
            store_lat: {
                type: Sequelize.STRING
            },
            store_lng: {
                type: Sequelize.STRING
            },
            province_id: {
                type: Sequelize.INTEGER
            },
            city_id: {
                type: Sequelize.INTEGER
            },
            region_id: {
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
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Stores');
    }
};