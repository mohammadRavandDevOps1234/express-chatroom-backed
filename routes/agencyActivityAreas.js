var express = require("express");
var router = express.Router();
let activityAreaController = require("../controller/activityAreaController");
let {
  mainRegisterActivityAreaValidation,
  mainUpdateActivityAreaValidation
} = require("../validator/agencyActivityAreaValitation.js");
/* GET users listing. */

router.post(
  "/register",
  mainRegisterActivityAreaValidation,
  activityAreaController.register_agency_activityArea
);

router.put(
  "/register",
  mainUpdateActivityAreaValidation,
  activityAreaController.udpate_agency_activityArea
);

router.post('/test',activityAreaController.test)
module.exports = router;
