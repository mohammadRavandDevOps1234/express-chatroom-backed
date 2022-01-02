const Joi = require("joi");

exports.mainRegisterConsumerValidation = ( req, res, next) => {
    try {  
        const mainValidation = Joi.object({
            user: Joi.required(),
            store: Joi.required(),
            nearConsumers: Joi.required(),
            accessToken: Joi.required(),
        });
        let result = mainValidation.validate(req.body);
        if (result.error == null) {
            next();
        } else {
            res.send(result.error.details);
        }
    } catch (error) {
        next(error)
    }
}

exports.userValidation = ( req, res, next) => {

    const userValidation = Joi.object({
        user_username: Joi.string().alphanum().min(3).max(30).required(),

        user_password: Joi.string()
            .required()
            .min(8)
            .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

        user_repeat_password: Joi.ref("user_password"),

        user_email: Joi.string()
            .required()
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    }).with("password", "repeat_password");
    let result = userValidation.validate(req.body.user);
    if (result.error == null) {
        next()
    } else {
        res.send(result.error.details);
    }

};


exports.storeValidation = ( req, res, next) => {

    const schemaValidation = Joi.object({
        store_name: Joi.string().alphanum().min(3).max(30).required(),

        store_province: Joi.number().required(),
        store_city: Joi.number().required(),
        store_region: Joi.number().required(),
        store_lat: Joi.string().required(),
        store_lng: Joi.string().required(),
        
    }).with("lat", "lng");
    let result = schemaValidation.validate(req.body.store);
    if (result.error == null) {
        next()
    } else {
        res.send(result.error.details);
    }

};

exports.nearConsumerValidations = ( req, res, next) => {

    const schemaValidation = Joi.array().items(Joi.string().alphanum().min(3).max(65)).required();;
    let result = schemaValidation.validate(req.body.nearConsumers);
    if (result.error == null) {
        next()
    } else {
        res.send(result.error.details);
    }

};