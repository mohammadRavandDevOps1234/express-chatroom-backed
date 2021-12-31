'use strict';
let { Consumer, Store } = require('./../models/index.js');
let { v4 } = require('uuid');
module.exports = {
    up: async(queryInterface, Sequelize) => {
        console.log(Consumer)
        await queryInterface.createTable('ConsumerStores', {
            id: {
                type: Sequelize.UUID,
                unique: true,
                primaryKey: true,
                defaultValue: v4()
            },
            StoreId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Stores',
                    key: 'id',
                }
            },
            ConsumerId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Consumers',
                    key: 'id',
                }
            },
            RoomId: {
                type: Sequelize.UUID,
                references: {
                    model: 'Rooms',
                    key: 'id',
                }
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
        await queryInterface.dropTable('ConsumerStores');
    }
};