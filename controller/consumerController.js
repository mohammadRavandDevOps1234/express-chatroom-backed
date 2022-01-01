const { sequelize } = require("./../database/mysqlConnect");
const Joi = require("joi");
const { Sequelize } = require("sequelize");
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

exports.consumer_signup_and_register_nearStores = async (req, res, next) => {
  //get consumer group id
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({ where: { name: "consumer" } });

    let hashPassword = bcrypt.hashSync(
      req.body.user.user_password,
      bcrypt.genSaltSync(15)
    );
    let consumer = await User.create(
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
        transaction: t,
      }
    );

    // res.send(consumer);
    group = await Group.findOne({ where: { name: "store" } });
    hashPassword = bcrypt.hashSync(
      req.body.user.user_password,
      bcrypt.genSaltSync(15)
    );

    let nearStores = req.body.nearStores.map((nearStore) => {
      let hashPassword = bcrypt.hashSync(
        nearStore.user.user_password,
        bcrypt.genSaltSync(15)
      );
      return {
        id: v4(),
        username: nearStore.user.user_username,
        email: nearStore.user.user_email,
        password: hashPassword,
        GroupId: group.id,
        StoreInfos: [
          {
            id: v4(),
            store_name: nearStore.store.store_name,
            store_lat: nearStore.store.store_lat,
            store_lng: nearStore.store.store_lng,
            province_id: nearStore.store.store_province,
            city_id: nearStore.store.store_city,
            region_id: nearStore.store.store_region,
          },
        ],
      };
    });

    let store = await Promise.all(
      nearStores.map((userStore) => {
        return User.create(userStore, {
          include: [{ model: Store, as: "StoreInfos" }],
          transaction: t,
        });
      })
    );
    
    let rooms = await Room.create(
      {
        id: v4(),
        room_name: "nearStore",
      },
      {
        transaction: t,
      }
    );

    let consumerNearStore = [];

    if (store.length >= 0) {
    } else {
      store = [store];
    }

    for (const oneStore of store) {
      if (!rooms.length) {
        rooms = [rooms];
      }
      for (const room of rooms) {
        consumerNearStore.push({
          id: v4(),
          StoreId: oneStore.StoreInfos.id,
          ConsumerId: consumer.ConsumerInfos.id,
          RoomId: room.id,
        });
      }
    }
    
    // let consumerStore = await ConsumerStore.create(...consumerNearStore, {
    //   transaction: t,
    // });

    let consumerStore = await Promise.all(
      consumerNearStore.map((consumerNearStore) => {
        return ConsumerStore.create(consumerNearStore, {
          transaction: t,
        });
      })
    );

    await t.commit();
    res.send(consumerStore)

    
  } catch (error) {
    await t.rollback();
  }
};

exports.test = async function (req, res, next) {
  let GroupId = "06543731-34a6-4d93-b6a7-bac6d8bac8c2";

  let nearStores = req.body.nearStores.map((nearStore) => {
    let hashPassword = bcrypt.hashSync(
      nearStore.user.user_password,
      bcrypt.genSaltSync(15)
    );
    return {
      id: v4(),
      username: nearStore.user.user_username,
      email: nearStore.user.user_email,
      password: hashPassword,
      GroupId: GroupId,
      StoreInfos: [
        {
          id: v4(),
          store_name: nearStore.store.store_name,
          store_lat: nearStore.store.store_lat,
          store_lng: nearStore.store.store_lng,
          province_id: nearStore.store.store_province,
          city_id: nearStore.store.store_city,
          region_id: nearStore.store.store_region,
        },
      ],
    };
  });

  const t = await sequelize.transaction();
  try {
    Promise.all(
      nearStores.map((userStore) => {
        return User.create(userStore, {
          include: [{ model: Store, as: "StoreInfos" }],
          transaction: t,
        });
      })
    )
      .then(async (values) => {
        await t.commit();
        res.send(values);
      })
      .catch(async (error) => {
        await t.rollback();
        res.send("error insert all records");
      });
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await t.rollback();
  }
};
