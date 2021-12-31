const { format } = require('date-fns');
const { v4 } = require('uuid');
module.exports = {

    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         */
        let getDate = function() {
            return format(new Date(Date.now()), 'yyyy-MM-dd H:m:s')
        }
        let randomGroupName = function() {
            var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            var result = ""
            var chaactersLength = characters.length;

            for (var i = 0; i < 5; i++) {
                result += characters.charAt(Math.floor(Math.random() * chaactersLength));
            }
            return result;
        }

        let generateUser = function() {
            let users = [];

            for (const iterator of Array(5).fill(2)) {
                user = {
                    id: v4(),
                    username: randomGroupName(),
                    email: "computercodemohammad@gmail.com",
                    password: "somepassword",
                    GroupId: 1,
                    createdAt: getDate(),
                    updatedAt: getDate()
                }
                users.push(user);
            }

            return users;
        }

        await queryInterface.bulkInsert('Users', generateUser(), {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         */

        await queryInterface.bulkDelete('Users', null, {});
    }
};