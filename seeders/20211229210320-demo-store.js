"use strict";
const { format } = require("date-fns");
const { v4 } = require("uuid");
module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        let randomGroupName = function() {
            var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
            var result = "";
            var chaactersLength = characters.length;

            for (var i = 0; i < 5; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * chaactersLength)
                );
            }
            return result;
        };

        let getDate = function() {
            return format(new Date(Date.now()), "yyyy-MM-dd H:m:s");
        };
        await queryInterface.bulkInsert(
            "Stores", [{
                    id: v4(),
                    UserId: v4(),
                    store_name: randomGroupName(),
                    store_lat: "35.35",
                    store_lng: "53.53",
                    province_id: 20,
                    city_id: 295,
                    region_id: 0,
                    createdAt: getDate(),
                    updatedAt: getDate(),
                },
                {
                    id: v4(),
                    UserId: v4(),
                    store_name: randomGroupName(),
                    store_lat: "35.35",
                    store_lng: "53.53",
                    province_id: 20,
                    city_id: 295,
                    region_id: 0,
                    createdAt: getDate(),
                    updatedAt: getDate(),
                },
                {
                    id: v4(),
                    UserId: v4(),
                    store_name: randomGroupName(),
                    store_lat: "35.35",
                    store_lng: "53.53",
                    province_id: 20,
                    city_id: 295,
                    region_id: 0,
                    createdAt: getDate(),
                    updatedAt: getDate(),
                },
                {
                    id: v4(),
                    UserId: v4(),
                    store_name: randomGroupName(),
                    store_lat: "35.35",
                    store_lng: "53.53",
                    province_id: 20,
                    city_id: 295,
                    region_id: 0,
                    createdAt: getDate(),
                    updatedAt: getDate(),
                },
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Stores', null, {});
    },
};