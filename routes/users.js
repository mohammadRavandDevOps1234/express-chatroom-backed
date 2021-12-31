var express = require('express');
let {authenticateJWT} = require("./../mixin/auth");

var router = express.Router();
let userController = require('./../controller/userController');
/* GET users listing. */



router.post('/register', userController.user_register_post);
router.get('/register', userController.user_register_view_get);
router.get('/login',authenticateJWT,userController.user_login_get);
router.post('/login',userController.user_login_post);
router.get('/:id', userController.user_showOne_user);
router.post('/', userController.user_create_get);
router.get('/', userController.user_show_user);

module.exports = router; 