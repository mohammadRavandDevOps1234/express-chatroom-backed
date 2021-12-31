var express = require('express');
var router = express.Router();
let userController = require('./../controller/userController');
/* GET users listing. */

router.post('/', userController.user_create_get);
router.get('/', userController.user_show_post);


module.exports = router;