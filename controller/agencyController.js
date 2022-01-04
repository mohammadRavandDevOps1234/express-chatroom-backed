const Joi = require("joi");
const { v4 } = require("uuid");
var bcrypt = require("bcryptjs");
const { sequelize } = require("../database/mysqlConnect");
const { Sequelize, Op } = require("sequelize");

const {
  User,
  Group,
  Company,
  Agency,
  AgencyActivity,
} = require("../models/index");

let { hashPassword } = require("../mixin/helpers.js");

exports.register_agency = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({
      where: { name: "agency" },
      attributes: ["id"],
    });
    let company = await User.findOne({
      where: { username: req.body.company_user_name },
      attributes: ["id"],
      include: [{ model: Company, as: "CompanyInfos", attributes: ["id"] }],
    });

    let userAgency = await User.create(
      {
        id: v4(),
        username: req.body.agency.user_username,
        email: req.body.agency.user_email,
        password: hashPassword(req.body.agency.user_password),
        GroupId: group.id,
        UserAgency: {
          id: v4(),
          CompanyId: company.CompanyInfos.id,
          agency_name: req.body.agency.agency_name,
        },
      },
      { include: [{ model: Agency, as: "UserAgency" }], transaction: t }
    );

    await t.commit();
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.sendStatus(400);
  }
};

exports.udpate_agency = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({
      where: { name: "agency" },
      attributes: ["id"],
    });
    let company = await User.findOne({
      where: { username: req.body.company_user_name },
      attributes: ["id"],
      include: [{ model: Company, as: "CompanyInfos", attributes: ["id"] }],
    });

    
    let user = await User.findOne({where:{username:req.body.agency.user_old_username}});
    
 
    let updateUserAgency = await User.update(
      {
        username: req.body.agency.user_username,
        email: req.body.agency.user_email,
        password: hashPassword(req.body.agency.user_password),
      },
      { where: { username: req.body.agency.user_old_username }, transaction: t }
    );

    let agencyUpdate = await Agency.update(
      {
        CompanyId: company.CompanyInfos.id,
        agency_name: req.body.agency.agency_name,
      },
      { where: { 
        [Op.and]: [{ CompanyId: company.CompanyInfos.id }, { UserId:user.id }],  
       }, transaction: t }
    );

    await t.commit();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.sendStatus(400);
  }
};

exports.test = async (req, res, next) => {
  try {
    res.send(200);
  } catch (error) {
    res.send(400);
  }
};
