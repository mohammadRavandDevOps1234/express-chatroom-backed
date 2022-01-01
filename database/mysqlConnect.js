const { Sequelize } = require('sequelize');
const mysqlSequelize = new Sequelize('express-chat', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

exports.sequelize = mysqlSequelize;