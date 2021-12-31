"use strict";
const { format } = require("date-fns");
const { v4 } = require("uuid");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         */
        let getDate = function() {
            return format(new Date(Date.now()), "yyyy-MM-dd H:m:s");
        };
        await queryInterface.bulkInsert(
            "ConsumerStores", [{
                    id: v4(),
                    StoreId: "173cb951-795d-4db4-8e9b-8ad264d73f11",
                    ConsumerId: "664272ea-8b72-4137-99c7-eef1e3dfff19",
                    RoomId: "153b5cbc-3899-4a37-b26e-52d97e3af812",
                    createdAt: getDate(),
                    updatedAt: getDate(),
                },
                {
                    id: v4(),
                    StoreId: "173cb951-795d-4db4-8e9b-8ad264d73f11",
                    ConsumerId: "664272ea-8b72-4137-99c7-eef1e3dfff19",
                    RoomId: "153b5cbc-3899-4a37-b26e-52d97e3af812",
                    createdAt: getDate(),
                    updatedAt: getDate(),
                }
            ], {}
        );
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete("ConsumerStores", null, {});
    },
};