var express = require('express');
var router = express.Router();
let roomController = require('../controller/roomController.js');
/* GET users listing. */

router.post('/', roomController.room_create_get);
router.get('/', roomController.room_show_get);


module.exports = router;