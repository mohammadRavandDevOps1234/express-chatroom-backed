const Joi = require('joi');
const { User, Group, Consumer } = require('./../models/index');
const { v4 } = require('uuid');
var bcrypt = require('bcryptjs');
var rand = require('csprng');
const jwt = require('jsonwebtoken');
let {accessTokenSecret} = require("./../mixin/auth");

//create new user
exports.user_create_get = function(req, res, next) {
    try {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(65).required(),
            email: Joi.string().email(),
            password: Joi.string().min(8).max(40),
            GroupId: Joi.string().min(30).max(36)
        });
        const result = schema.validate(req.body);
        if (result.error) {
            res.send(result.error.details.map(error => {
                return { message: error.message }
            }));
        }
        Group.findOne({
            where: { id: result.value.GroupId }
        }).then(function(group) {
            console.log('group id is exist')
            if (group && Object.keys(group).length) {
                console.log('object keys is ok')
                User.create({
                    id: v4(),
                    username: result.value.username,
                    email: result.value.email,
                    password: result.value.password,
                    GroupId: result.value.GroupId
                }).then(function(userInserted) {

                    res.status(200).json(userInserted);
                }).catch(function(error) {

                    res.status(400).send()
                });
            } else {
                res.status(400).send()
            }
        }).catch(function(error) {
            res.status(400).send()
        })
    } catch (error) {
        res.status(500).send()
    }

};


//show users 
exports.user_show_user = function(req, res, next) {
    try {
        User.findOne({ where: { GroupId: "300d20ab-3184-4a5e-926d-4a895c9bc97f" } })
            .then(function(users) {
                users.getGroup().then(function(group) {
                    res.send({
                        users: users,
                        group: group
                    });
                }).catch(function(error) {
                    res.send({
                        users: users,
                        group: null
                    });
                })
            }).catch(function(error) {
                res.send(400);
            })
    } catch (error) {
        res.send(400);
    }
}; 


//show users 
exports.user_showOne_user = function(req, res, next) {
    try {
    
        
        let user_id = (req.body.id);
        User.findOne({
                where: { "id": user_id }
            }).then((user) => {
                user.getConsumerInfos().then((consumerInfos) => {
                    res.send(consumerInfos)
                })
            }).catch((error) => {
                console.log(error);
                res.sendStatus(400);
            })          
    } catch (error) {
        res.send(400);
    }
};


exports.user_register_view_get = function(req, res, next) {
    res
  .status(201)
  .cookie('access_token', 'Bearer ' + token, {
    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
  })
  .cookie('test', 'test').send();

};


exports.user_register_post = function(req, res, next) {
    try {

        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            configm_password: Joi.ref('password'),

            GroupId: [
                Joi.string()
            ],
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })


        let requestValidated = schema.validate(req.body);

        if (requestValidated.error) {
            let { message, context } = requestValidated.error.details[0]
            res.send({ message, context });
        } else {
            
            //if email exist return exist user info
            User.findOne({
                where: { email: requestValidated.value.email }
            }).then((userFinded) => {
                if (userFinded && Object.keys(userFinded).length) {
                    res.status(409).json({error:{message:'user already info exist'}});
                } else {
                    Group.findOne({ where: { id: requestValidated.value.GroupId } })
                    .then((group) => {
                        if (group && Object.keys(group).length) {
                                    var hashPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(15));
                                    User.create({
                                        id:v4(),
                                        username:requestValidated.value.username,
                                        email:requestValidated.value.email,
                                        password:hashPassword,
                                        GroupId:group.id
                                    }).then((groupUserCreated)=>{
                                        res.send(groupUserCreated)
                                    }).catch((error)=>{
                                        console.log(error)
                                    })
                                } else {
                                    res.status(428).json({error:{message:'group id is not exist'}});
                                }
                            })
                    }
                }).catch((error) => {
                    res.status(400).json({error:{message:'group id is not exist'}});

                })            


        }

        // res.send(req.body)



    } catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

};


exports.user_login_post = function(req, res, next) {
    const { username, password } = req.body;
    
    User.findOne({where:{username:username}})
    .then((user)=>{
        if(!bcrypt.compareSync(password, user.password)){
            //error
            res.send('error')
        }else{
            //successfull
            
            const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
            res.json({
                accessToken,
                accessTokenSecret
            });

            // res.send(user);
        }
        
    })
    .catch((error)=>{
        res.send(error)
    })
};


exports.user_login_get = function(req, res, next) {
    res.json(req.user);
};