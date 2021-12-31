const Joi = require('joi');
const { User, Group, Consumer, Room } = require('../models/index');
const { v4 } = require('uuid');


//create new user
exports.room_create_get = function(req, res, next) {
    try {
        res.send('some  thing');
    } catch (error) {
        res.status(500).send()
    }

};


//show users 
exports.room_show_get = function(req, res, next) {
    try {
        let roomId = req.body.room_id;
        Room.findOne({ where: { id: roomId } })
            .then((room) => {
                room.getConsumerStoreRoomChannel()
                    .then((consumerRoom) => {
                        res.send(consumerRoom)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                console.log(eroor)
                res.send(error)
            })
    } catch (error) {
        console.log(error)
        res.sendStatus(400);
    }
};