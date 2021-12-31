const Joi = require('joi');
const { Consumer, Store, ConsumerStore } = require('./../models/index');
const { v4 } = require('uuid');
const { reset } = require('nodemon');


exports.consumer_create_get = function(req, res, next) {
    let consumer_id = req.params.consumer_id;
};
exports.consumer_show_post = async function(req, res, next) {
    // Get all orders
    const allOrders = await Consumer.findAll({

        // Make sure to include the products
        include: [{
            model: Store,
            as: 'nearConsumerStore',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            attributes: ['id'],
            through: {
                // This block of code allows you to retrieve the properties of the join table
                model: ConsumerStore,
                as: 'ConsumerStores'
            }
        }]
    });

    // If everything goes well respond with the orders
    res.send(allOrders)
};


exports.consumer_relation_working = async function(req, res, next) {
    // Get all orders
    const allOrders = await Order.findAll({

        // Make sure to include the products
        include: [{
            model: Product,
            as: 'products',
            required: false,
            // Pass in the Product attributes that you want to retrieve
            attributes: ['id', 'title'],
            through: {
                // This block of code allows you to retrieve the properties of the join table
                model: ProductOrder,
                as: 'productOrders',
                attributes: ['quantity'],
            }
        }]
    });

    // If everything goes well respond with the orders
    res.send(allOrders)
};