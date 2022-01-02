var express = require("express");
var router = express.Router();
let storeController = require("./../controller/storeController.js");
let {
  mainRegisterConsumerValidation,
  userValidation,
  storeValidation,
  nearConsumerValidations,
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
router.put("/register", storeController.store_show_get);

module.exports = router;
