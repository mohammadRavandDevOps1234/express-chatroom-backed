var express = require('express');
var router = express.Router();
let consumerstoreController = require('../controller/consumerstoreController.js');
/* GET users listing. */

router.post('/', consumerstoreController.consumerstore_create_get);
router.get('/', consumerstoreController.consumerstore_show_get);


module.exports = router;