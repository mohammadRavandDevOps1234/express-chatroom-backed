var express = require('express');
var router = express.Router();
const { User, Group } = require('./../models/index');

/* GET home page. */
router.get('/', function(req, res, next) {

    try {
        User.findAll({ include: Group }).then((users) => {
            res.status(200).json(users)
        }).catch(error => {
            res.status(400).send(error)
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }

    // res.render('index', { title: 'Express' });
});

module.exports = router;