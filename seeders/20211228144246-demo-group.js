'use strict';
const { format } = require('date-fns');
const { v4 } = require('uuid');
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
        let groupNames = [
            'consumer',
            'admin',
            'store',
            'company'
        ];


        groupNames.forEach(async (groupName) => {
            
            await queryInterface.bulkInsert('Groups', [{
                id: v4(),
                name: groupName,
                createdAt: getDate(),
                updatedAt: getDate()
            }], {});
        
        });


    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */
        await queryInterface.bulkDelete('Groups', null, {});
    }
};