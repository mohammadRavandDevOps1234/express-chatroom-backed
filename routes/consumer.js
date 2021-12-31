var express = require('express');
var router = express.Router();
let consumerController = require('../controller/consumerController.js');
/* GET users listing. */

router.post('/', consumerController.consumer_create_get);
router.get('/', consumerController.consumer_show_post);


module.exports = router;