
const Joi = require("joi");


exports.mainRegisterConsumerValidation = ( req, res, next) => {
        
        try {
            
            const mainValidation = Joi.object({
                user: Joi.required(),
                consumer: Joi.required(),
                nearStores: Joi.required(),
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
    
};


exports.mainUpdateConsumerValidation = ( req, res, next) => {
        
    try {
        
        const mainValidation = Joi.object({
            user: Joi.required(),
            consumer: Joi.required(),
            nearStores: Joi.required(),
            removeNearStores: Joi.required(),
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

};

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
exports.updateUserValidation = ( req, res, next) => {

        const userValidation = Joi.object({
            user_username: Joi.string().alphanum().min(3).max(30).required(),
            user_old_username: Joi.string().alphanum().min(3).max(30).required(),

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

exports.consumerValidation = (req, res, next) => {
        
        const consumerValidation = Joi.object({
            consumer_name: Joi.string().alphanum().min(3).max(30).required(),
            consumer_province: Joi.number().required(),
            consumer_city: Joi.number().required(),
            consumer_region: Joi.number().default("0"),
            consumer_lat: Joi.string().min(4).max(45).required(),
            consumer_lng: Joi.string().min(4).max(45).required(),
        });
        let result = consumerValidation.validate(req.body.consumer);
        if (result.error == null) {
            next();
        } else {
            res.send(result.error.details);
        }
  
};


function mainOneStoreValidation(mainStore){
    const oneNearStoreValidation = Joi.object({
        user:Joi.object().required(),
        store:Joi.object().required()
    });
    
    return oneNearStoreValidation.validate(mainStore);
}


function oneNearStoreUserValidation(userStore){
    let userStoreValidation =Joi.object({
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
    return userStoreValidation.validate(userStore);
}

function oneNearStoreStoreValidation(store){
    const nearStoreStoreValidation = Joi.object({
        store_name: Joi.string().min(3).max(30).required(),
        store_province: Joi.number().required(),
        store_city: Joi.number().required(),
        store_region: Joi.number().default("0"),
        store_lat: Joi.string().min(4).max(45).required(),
        store_lng: Joi.string().min(4).max(45).required(),
    });

    return nearStoreStoreValidation.validate(store);
}

function validateOneNearStore(nearStore) {
    
     // validate main one store schema
     let result= mainOneStoreValidation(nearStore)
     // end validate main one store schema

     if(result.error !=null){
        return result;
     }

    // validate user nearStore schema
     result= oneNearStoreUserValidation(nearStore.user);
     if(result.error !=null){
         return result;
     }

    
    // validate store nearStore schema
    result = oneNearStoreStoreValidation(nearStore.store);
    if(result.error !=null){
        return result;
    }

    return result;
  
}

exports.nearStoreValidation = ( req, res, next) => {
    
        //    nearstore object
        const minConsumerValidation = Joi.array().items(Joi.object()).required();
        let result = minConsumerValidation.validate(req.body.nearStores);
        if (result.error == null) {
           

            /**
             * start validate one nearStore
             */
            let result = null;
            let isValid = true;
            for (const nearStore of req.body.nearStores) {
                result = validateOneNearStore(nearStore);
                if (result.error == null) {
                    continue;
                } else {
                    isValid = false;
                    break;
                }
            }

            if (isValid) {
                next()
            } else {
                res.send(result.error.details);
            }

            /**
             * end validate one nearStore
             */
        } else {
            res.send(result.error.details);
        }
   
};
exports.removeNearStoreValidation = ( req, res, next) => {
    
    //    nearstore object
    const minConsumerValidation = Joi.array().items(Joi.string());
    let result = minConsumerValidation.validate(req.body.removeNearStores);
    if (result.error == null) {
        next()
    } else {
        res.send(result.error.details);
    }
   
};

exports.registerConsumerValidation = ( req, res, next) => {
    try {
        
        next();
    } catch (error) {
        next(error)
        res.status(400).json({ error: { message: "validation error" } });
    }
};
