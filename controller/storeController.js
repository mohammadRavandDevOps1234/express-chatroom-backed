const Joi = require('joi');
const { User, Group, Consumer, Room } = require('../models/index');
const { v4 } = require('uuid');


//create new user
exports.store_create_get = function(req, res, next) {
    try {
        res.send('some  thing post url');
    } catch (error) {
        res.status(500).send()
    }
};


//show users 
exports.store_show_get = function(req, res, next) {
    try {
        res.send('show url get')
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
};