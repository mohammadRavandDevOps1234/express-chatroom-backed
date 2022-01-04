const Joi = require("joi");

exports.registerAgencyValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      accessToken: Joi.required(),
      company_user_name: Joi.string().alphanum().min(3).max(65).required(),
      agency: Joi.object({
        user_username: Joi.string().alphanum().min(3).max(30).required(),
        agency_name: Joi.string().alphanum().min(3).max(30).required(),
        user_password: Joi.string()
          .required()
          .min(8)
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

        user_repeat_password: Joi.ref("user_password"),

        user_email: Joi.string()
          .required()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      }).with("password", "repeat_password"),
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

exports.updateAgencyValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      accessToken: Joi.required(),
      company_user_name: Joi.string().alphanum().min(3).max(65).required(),
      agency: Joi.object({
        user_username: Joi.string().alphanum().min(3).max(30).required(),
        user_old_username: Joi.string().alphanum().min(3).max(30).required(),
        agency_name: Joi.string().alphanum().min(3).max(30).required(),
        user_password: Joi.string()
          .required()
          .min(8)
          .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

        user_repeat_password: Joi.ref("user_password"),

        user_email: Joi.string()
          .required()
          .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      }).with("password", "repeat_password"),
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