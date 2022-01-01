const Joi = require("joi");
const {
  User,
  Consumer,
  Store,
  ConsumerStore,
  Group,
  Room,
} = require("./../models/index");
const { v4 } = require("uuid");
var bcrypt = require("bcryptjs");
const { roundToNearestMinutes } = require("date-fns");
exports.consumer_create_get = function (req, res, next) {
  let consumer_id = req.params.consumer_id;
};

exports.consumer_show_post = async function (req, res, next) {
  // Get all orders
  const allOrders = await Consumer.findAll({
    // Make sure to include the products
    include: [
      {
        model: Store,
        as: "nearConsumerStore",
        required: false,
        // Pass in the Product attributes that you want to retrieve
        attributes: ["id"],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: ConsumerStore,
          as: "ConsumerStores",
        },
      },
    ],
  });

  // If everything goes well respond with the orders
  res.send(allOrders);
};

exports.consumer_relation_working = async function (req, res, next) {
  // Get all orders
  const allOrders = await Order.findAll({
    // Make sure to include the products
    include: [
      {
        model: Product,
        as: "products",
        required: false,
        // Pass in the Product attributes that you want to retrieve
        attributes: ["id", "title"],
        through: {
          // This block of code allows you to retrieve the properties of the join table
          model: ProductOrder,
          as: "productOrders",
          attributes: ["quantity"],
        },
      },
    ],
  });

  // If everything goes well respond with the orders
  res.send(allOrders);
};

exports.consumer_signup_and_register_nearStores = function (req, res, next) {
  //get consumer group id

  Group.findOne({ where: { name: "consumer" } }).then((group) => {
    var hashPassword = bcrypt.hashSync(
      req.body.user.user_password,
      bcrypt.genSaltSync(15)
    );
    User.create(
      {
        id: v4(),
        username: req.body.user.user_username,
        email: req.body.user.user_email,
        password: hashPassword,
        GroupId: group.id,
        ConsumerInfos: {
          id: v4(),
          consumer_name: req.body.consumer.consumer_name,
          consumer_lat: req.body.consumer.consumer_lat,
          consumer_lng: req.body.consumer.consumer_lng,
          province_id: req.body.consumer.consumer_province,
          city_id: req.body.consumer.consumer_city,
          region_id: req.body.consumer.consumer_region,
        },
      },
      {
        include: [{ model: Consumer, as: "ConsumerInfos" }],
      }
    )
      .then((consumer) => {
        // res.send(consumer);
        Group.findOne({ where: { name: "store" } })
          .then((group) => {
            var hashPassword = bcrypt.hashSync(
              req.body.user.user_password,
              bcrypt.genSaltSync(15)
            );
            User.create(
              {
                id: v4(),
                username: req.body.user.user_username + "store",
                email: req.body.user.user_email + "store",
                password: hashPassword,
                GroupId: group.id,
                StoreInfos: [
                  {
                    id: v4(),
                    store_name: "storname",
                    store_lat: "35.35",
                    store_lng: "53.53",
                    province_id: "20",
                    city_id: "295",
                    region_id: "0",
                  },
                ],
              },
              {
                include: [{ model: Store, as: "StoreInfos" }],
              }
            )
              .then((store) => {
                
                Room.bulkCreate(
                  [{
                    id: v4(),
                    room_name: "nearStore",
                  }]
                )
                  .then((rooms) => {
                    console.log('room created with status 200 ok')
                    let consumerNearStore = [];
                    
                  if(!store.length){
                    store.StoreInfos = [store.StoreInfos];
                  }
                  
                for (const oneStore of store.StoreInfos) {
                  console.log('start--nearStores');
                  console.log(oneStore)
                  console.log('end--nearStore');
                  if(!rooms.length){
                    rooms = [rooms];
                  }
                  for (const room of rooms) {
                    consumerNearStore.push({
                      id:v4(),
                      StoreId:oneStore.id,
                      ConsumerId:consumer.ConsumerInfos.id,
                      RoomId:room.id
                    });
                  }
                }
                console.log(consumerNearStore)
                ConsumerStore.create(...consumerNearStore)
                  .then((consumerStore)=>{
                    res.send(consumerStore)
                  })
                  .catch((error)=>{
                    console.log(error)
                    res.send(error)
                  })
                  })
                  .catch((error) => {
                    console.log(error);
                    res.send("room not created");
                  });             

              })
              .catch((error) => {
                console.log(error);
                res.send("store not inserted");
              });
          })
          .catch((error) => {
            console.log(error);
            res.send("consumer not found");
          });
      })
      .catch((error) => {
        console.log(error);
        res.send("group not found");
      });

    //register user

    //register consumer

    //register consumr near stores
  });
};
