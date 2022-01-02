var express = require("express");
var router = express.Router();
let consumerController = require("../controller/consumerController.js");
let {
  mainRegisterConsumerValidation,
  userValidation,
  updateUserValidation,
  consumerValidation,
  nearStoreValidation,
  registerConsumerValidation,
  removeNearStoreValidation,
  mainUpdateConsumerValidation
} = require("../validator/consumerValidator.js");
/* GET users listing. */

router.post(
  "/register",
  mainRegisterConsumerValidation,
  userValidation,
  consumerValidation,
  nearStoreValidation,
  registerConsumerValidation,
  consumerController.consumer_signup_and_register_nearStores
);

router.put(
  "/register",
  mainUpdateConsumerValidation,
  updateUserValidation,
  consumerValidation,
  nearStoreValidation,
  removeNearStoreValidation,
  registerConsumerValidation,
  consumerController.consumer_signup_and_update_nearStores
);
router.post("/", consumerController.consumer_create_get);
router.get("/", consumerController.consumer_show_post);

module.exports = router;
