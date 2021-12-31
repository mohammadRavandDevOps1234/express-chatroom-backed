'use strict';
const { format } = require('date-fns');
const { v4 } = require("uuid");

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        let getDate = function() {
            return format(new Date(Date.now()), 'yyyy-MM-dd H:m:s')
        }
        await queryInterface.bulkInsert('Consumers', [{
            id: v4(),
            UserId: "3ccf4bb8-5ccd-4b6d-b33e-5a0f7e3b39aa",
            consumer_name: 'mohammad',
            consumer_lat: '35.35',
            consumer_lng: '53.53',
            province_id: '20',
            city_id: '295',
            region_id: '0',
            createdAt: getDate(),
            updatedAt: getDate()
        }], {});

    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Consumers', null, {});
    }
};