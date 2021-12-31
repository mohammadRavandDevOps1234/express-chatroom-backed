"use strict";
const { v4 } = require("uuid");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        try {
            queryInterface
                .createTable("Users", {
                    id: {
                        type: Sequelize.UUID,
                        unique: true,
                        primaryKey: true,
                        defaultValue: v4(),
                    },
                    username: {
                        type: Sequelize.STRING(65),
                        unique: true,
                    },
                    email: {
                        type: Sequelize.STRING(65),
                    },
                    password: {
                        type: Sequelize.STRING,
                    },
                    GroupId: {
                        
                        type: Sequelize.UUID,
                        references: {
                            model: 'Groups',
                            key: 'id',
                        }
                        
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE,
                    },
                }).then(() => {
                    return queryInterface.addIndex("Users", ["GroupId"]);
                }).then(() => {
                    // ...
                })

        } catch (error) {
            console.log(error)
        }


    },
    down: async(queryInterface, Sequelize) => {
        try {
            queryInterface.removeIndex("Users", ["GroupId"])
                .then(() => {
                    queryInterface.dropTable("Users").then(() => {})

                }).catch(function(error) {
                    queryInterface.dropTable("Users").then(() => {})
                })
        } catch (error) {
            queryInterface.dropTable("Users").then(() => {})
        }

    },
};