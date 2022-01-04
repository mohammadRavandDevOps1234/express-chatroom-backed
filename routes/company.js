var express = require("express");
var router = express.Router();
let companyController = require("./../controller/companyController");
let {
  mainRegisterCompanyValidation,
  userValidation,
  registerCompanyValidation,
  mainUpdateCompanyValidation,
  updateUserValidation,
  updateCompanyValidation,
  CompanyRegisterLogoValidation,
CompanyUpdateLogoValidation
} = require("../validator/companyValitation.js");
/* GET users listing. */

router.post(
  "/register",
  mainRegisterCompanyValidation,
  userValidation,
  registerCompanyValidation,
  companyController.register_company
);



router.put(
  "/logo",
  CompanyUpdateLogoValidation,
  companyController.update_company_logo
);

router.put(
  "/register",
  mainUpdateCompanyValidation,
  updateUserValidation,
  updateCompanyValidation,
  companyController.udpate_company
);


module.exports = router;
