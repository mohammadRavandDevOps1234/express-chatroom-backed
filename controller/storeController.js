const Joi = require("joi");
const { v4 } = require("uuid");
var bcrypt = require("bcryptjs");
const { sequelize } = require("./../database/mysqlConnect");
const {
  User,
  Consumer,
  Store,
  ConsumerStore,
  Group,
  Room,
} = require("./../models/index");

let { hashPassword } = require("./../mixin/helpers.js");

//create new user
exports.store_signup_and_register_nearConsumers = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    //get store group id
    let group = await Group.findOne({ where: { name: "store" } });

    //register user
    let store = await User.create(
      {
        id: v4(),
        username: req.body.user.user_username,
        email: req.body.user.user_email,
        password: hashPassword(req.body.user.user_password),
        GroupId: group.id,
        StoreInfos: {
          id: v4(),
          store_name: req.body.store.store_name,
          store_lat: req.body.store.store_lat,
          store_lng: req.body.store.store_lng,
          province_id: req.body.store.store_province,
          city_id: req.body.store.store_city,
          region_id: req.body.store.store_region,
        },
      },
      {
        include: [{ model: Store, as: "StoreInfos" }],
        transaction: t,
      }
    );

    // t.commit();


    //get consumer group id
    consumerGroupId = await Group.findOne({ where: { name: "consumer" } });

    
    //register store info
    let nearCosumers = await User.findAll({
        where: { username: req.body.nearConsumers,GroupId:consumerGroupId.id },
        include: [{ model: Consumer, as: "ConsumerInfos"}],
    });
     
    let room = await Room.findOne({where:{room_name:"nearStore"}});
    // await t.commit()
    
    
    let consumerStore = await Promise.all(
      nearCosumers.map((nearConsumer) => {
          return ConsumerStore.create({
            StoreId:store.StoreInfos.id,
            ConsumerId :nearConsumer.ConsumerInfos.id,
            RoomId:room.id
          }, {
            transaction: t,
          });
        })
    );
    
    await t.commit();
    res.send(consumerStore);
    return;
    //regsiter store for near sores
  } catch (error) {
    await t.rollback();
    console.log(error);
    res.sendStatus(400);
  }
};

//show users
exports.store_show_get = function (req, res, next) {
  try {
    res.send("show url get");
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};


exports.test = async function(req,res,next){
 try {
  let userId = "16e6b926-3898-497f-b937-fcf4db204622";
  let user = await User.findOne({where:{id:userId},include:[{model:Consumer,as:"ConsumerInfos"}]})
  let consumer = user.ConsumerInfos;

  consumer = await consumer.getNearConsumerStore();
  
  consumer = await Promise.all(consumer.map((consumer)=>{
    return ConsumerStore.findOne({StoreId:consumer.ConsumerStores.StoreId,ConsumerId:consumer.ConsumerStores.ConsumerId});
  }))
  

  res.send(consumer)
 } catch (error) {
   console.log(error)
   res.send('test error')
 }
}