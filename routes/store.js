var express = require('express');
var router = express.Router();
let storeController = require('../controller/storeController.js');
/* GET users listing. */

router.post('/', storeController.store_create_get);
router.get('/', storeController.store_show_get);


module.exports = router;