const { sequelize } = require("./../database/mysqlConnect");
const Joi = require("joi");
const { Sequelize,Op } = require("sequelize");
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
        return User.findOrCreate({
          where: { username: userStore.username },
          include: [{ model: Store, as: "StoreInfos" }],
          defaults: userStore,
          transaction: t,
        });
        // return User.findOrCreate(userStore, {include: [{ model: Store, as: "StoreInfos" }],  transaction: t, });
      })
    );

    let rooms = await Room.findOrCreate({
      where: { room_name: "nearStore" },
      defaults: {
          id: v4(),
          room_name: "nearStore",
        },
      transaction: t,
    }      
    );

    let consumerNearStore = [];

    if (store.length >= 0) {
      store = store.map((oneStore) => {
        return oneStore[0];
      });
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
    res.send(consumerStore);
  } catch (error) {
    await t.rollback();
    res.send("main error");
  }
};

exports.consumer_signup_and_update_nearStores = async (req, res, next) => {
  //get consumer group id
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({ where: { name: "consumer" } });

    let hashPassword =(password)=>{
      return bcrypt.hashSync(
        password,
        bcrypt.genSaltSync(15)
      );
    }
   
    let updateUserConsumer = await User.update({
      username:req.body.user.user_username,
      email:req.body.user.user_email,
      password:hashPassword(req.body.user.user_password)
    },{where:{username:req.body.user.user_old_username}, transaction: t  });
    
    let user =await User.findOne({where:{username:req.body.user.user_old_username}})
    let consumer = await Consumer.findOne({where:{UserId:user.id}});
    let updateConsumerInfo = await Consumer.update({
      consumer_name: req.body.consumer.consumer_name,
      consumer_lat: req.body.consumer.consumer_lat,
      consumer_lng: req.body.consumer.consumer_lng,
      province_id: req.body.consumer.consumer_province,
      city_id: req.body.consumer.consumer_city,
      region_id: req.body.consumer.consumer_region,
    },{where:{UserId:user.id}, transaction: t  });

    // res.send(consumer);
    group = await Group.findOne({ where: { name: "store" } });
   

    let nearStores = req.body.nearStores.map((nearStore) => {
      return {
        id: v4(),
        username: nearStore.user.user_username,
        email: nearStore.user.user_email,
        password: hashPassword(nearStore.user.user_password),
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
        return User.findOrCreate({
          where: { username: userStore.username },
          include: [{ model: Store, as: "StoreInfos" }],
          defaults: userStore,
          transaction: t,
        });
        // return User.findOrCreate(userStore, {include: [{ model: Store, as: "StoreInfos" }],  transaction: t, });
      })
    );
    
    let userStores = await User.findAll({
      where: { username: req.body.removeNearStores },
      include: [{ model: Store, as: "StoreInfos" }],
    });
    userStores = userStores.map((userStore) => {
      return userStore.StoreInfos.id;
    });

    let removeNearStores = await ConsumerStore.destroy({
      where: {
        [Op.and]: [{ StoreId: userStores }, { ConsumerId:consumer.id }],
      },
      transaction: t,
    });


    let rooms = await Room.findOne({where:{room_name:"nearStore"}});

    let consumerNearStore = [];

    if (store.length >= 0) {
      store = store.map((oneStore) => {
        return oneStore[0];
      });
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
          ConsumerId: consumer.id,
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
    res.send(consumerStore);
  } catch (error) {
    console.log(error)
    await t.rollback();
    res.send("main error");
  }
};

