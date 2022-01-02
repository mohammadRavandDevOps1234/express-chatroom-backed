var express = require("express");
var router = express.Router();
let storeController = require("./../controller/storeController.js");
let {
  mainRegisterConsumerValidation,
  userValidation,
  updateUserValidation,
  storeValidation,
  nearConsumerValidations,
  mainUpdateConsumerValidation
} = require("./../validator/storeValidation");
/* GET users listing. */

router.post(
  "/register",
  mainRegisterConsumerValidation,
  userValidation,
  storeValidation,
  nearConsumerValidations,
  storeController.store_signup_and_register_nearConsumers
);
router.put("/register",
mainUpdateConsumerValidation,
updateUserValidation,
storeValidation,
nearConsumerValidations,
storeController.store_update_and_register_nearConsumers);
router.get('/test',storeController.test)

module.exports = router;
