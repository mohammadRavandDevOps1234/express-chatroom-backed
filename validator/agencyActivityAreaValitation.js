const Joi = require("joi");

exports.mainRegisterActivityAreaValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      agencyUsername: Joi.string().required(),
      activityArea: Joi.array().items(Joi.object({
        province:Joi.number(),
        city:Joi.number(),
        region:Joi.array().items(Joi.number())
      })).required(),
      accessToken: Joi.required(),
    });
    let result = mainValidation.validate(req.body);
    if (result.error == null) {
      next();
    } else {
      res.send(result.error.details);
    }
  } catch (error) {
    next(error);
  }
};


exports.mainUpdateActivityAreaValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      agencyUsername: Joi.string().required(),
      activityArea: Joi.array().items(Joi.object({
        province:Joi.number(),
        city:Joi.number(),
        region:Joi.array().items(Joi.number())
      })).required(),
      removeActivityArea: Joi.array().items(Joi.object({
        province:Joi.number(),
        city:Joi.number(),
        region:Joi.array().items(Joi.number())
      })).required(),
      accessToken: Joi.required(),
    });
    let result = mainValidation.validate(req.body);
    if (result.error == null) {
      next();
    } else {
      res.send(result.error.details);
    }
  } catch (error) {
    next(error);
  }
};


