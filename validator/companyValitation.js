const Joi = require("joi");

exports.mainRegisterCompanyValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      user: Joi.required(),
      company: Joi.required(),
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

exports.mainUpdateCompanyValidation = (req, res, next) => {
  try {
    const mainValidation = Joi.object({
      user: Joi.required(),
      company: Joi.required(),
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



exports.userValidation = (req, res, next) => {
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
    next();
  } else {
    res.send(result.error.details);
  }
};

exports.updateUserValidation = (req, res, next) => {
  const userValidation = Joi.object({
    user_username: Joi.string().alphanum().min(3).max(30).required(),
    user_old_username:Joi.string().alphanum().min(3).max(30).required(),
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
    next();
  } else {
    res.send(result.error.details);
  }
};


exports.registerCompanyValidation = (req, res, next) => {
  const companyValidation = Joi.object({
    company_name: Joi.string().min(3).max(30).required(),
    company_brand:Joi.string(),
    company_province: Joi.number().required(),
    company_city: Joi.number().required(),
    company_region: Joi.number().default("0"),
    company_logo:Joi.string().allow(null, '')
  });

  let result = companyValidation.validate(req.body.company);
  if (result.error == null) {
    next();
  } else {
    res.send(result.error.details);
  }
};

exports.updateCompanyValidation = (req, res, next) => {
  const companyValidation = Joi.object({
    company_name: Joi.string().min(3).max(30).required(),
    company_brand:Joi.string(),
    company_province: Joi.number().required(),
    company_city: Joi.number().required(),
    company_region: Joi.number().default("0"),
    company_logo:Joi.string().allow(null, '')
  });

  let result = companyValidation.validate(req.body.company);
  if (result.error == null) {
    next();
  } else {
    res.send(result.error.details);
  }
};

exports.CompanyRegisterLogoValidation = (req, res, next) => {
  const companyLogoValidation = Joi.object({
    company_user_name: Joi.string().alphanum().min(3).max(30).required(),
    company_logo:Joi.string().allow(null, ''),
    accessToken: Joi.required(),
  });

  let result = companyLogoValidation.validate(req.body.company);
  if (result.error == null) {
    next();
  } else {
    res.send(result.error.details);
  }
};

exports.CompanyUpdateLogoValidation = (req, res, next) => {
  const companyLogoValidation = Joi.object({
    company_user_name: Joi.string().alphanum().min(3).max(30).required(),
    company_logo:Joi.string().allow(null, ''),
    accessToken: Joi.required(),
  });

  let result = companyLogoValidation.validate(req.body.company);
  if (result.error == null) {
    next();
  } else {
    res.send(result.error.details);
  }
};

