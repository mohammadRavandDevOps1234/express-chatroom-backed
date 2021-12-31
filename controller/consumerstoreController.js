const Joi = require('joi');
const { User, Group, Consumer, Room, ConsumerStore } = require('../models/index');
const { v4 } = require('uuid');


//create new user
exports.consumerstore_create_get = function(req, res, next) {
    try {
        ConsumerStore.findOne({})
            .then((consumerStore) => {
                res.send(consumerStore)
            })
    } catch (error) {
        res.status(500).send()
    }

};


//show users 
exports.consumerstore_show_get = function(req, res, next) {
    try {
        ConsumerStore.findOne({})
            .then((consumerStore) => {
                consumerStore.getRoom()
                    .then((room) => {
                        res.send(room)
                    })
            })
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
};