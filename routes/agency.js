var express = require("express");
var router = express.Router();
let agencyController = require("../controller/agencyController");
let {
  registerAgencyValidation,
  updateAgencyValidation
} = require("../validator/agencyValidation.js");
/* GET users listing. */

router.post(
  "/register",
  registerAgencyValidation,
  agencyController.register_agency
);

router.put(
  "/register",
  updateAgencyValidation,
  agencyController.udpate_agency
);

router.post('/test',agencyController.test)
module.exports = router;
