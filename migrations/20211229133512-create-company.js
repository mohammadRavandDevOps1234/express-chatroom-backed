'use strict';
const { v4 } = require("uuid");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Companies', {
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
            company_name: {
                type: Sequelize.STRING(65),
                unique: true,
                allowNull: false
            },
            company_brand: {
                type: Sequelize.STRING(65),
                unique: true,
                allowNull: false
            },
            company_logo: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: ''
            },
            province: {
                type: Sequelize.INTEGER
            },
            city: {
                type: Sequelize.INTEGER
            },
            region: {
                type: Sequelize.INTEGER,
                defaultValue: 0
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
        await queryInterface.dropTable('Companies');
    }
};