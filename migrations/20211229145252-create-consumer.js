'use strict';
const { v4 } = require("uuid");
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Consumers', {
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
            consumer_name: {
                type: Sequelize.STRING(50)
            },
            consumer_lat: {
                type: Sequelize.STRING(45)
            },
            consumer_lng: {
                type: Sequelize.STRING(45)
            },
            province_id: {
                type: Sequelize.INTEGER(4)
            },
            city_id: {
                type: Sequelize.INTEGER(6)
            },
            region_id: {
                type: Sequelize.INTEGER(3)
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
        await queryInterface.dropTable('Consumers');
    }
};