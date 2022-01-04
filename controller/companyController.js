const Joi = require("joi");
const { v4 } = require("uuid");
var bcrypt = require("bcryptjs");
const { sequelize } = require("./../database/mysqlConnect");
const { Sequelize, Op } = require("sequelize");

const { User, Group, Company, Agency } = require("./../models/index");

let { hashPassword } = require("./../mixin/helpers.js");

exports.register_company = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({ where: { name: "company" } });

    let company = await User.create(
      {
        id: v4(),
        username: req.body.user.user_username,
        email: req.body.user.user_email,
        password: hashPassword(req.body.user.user_password),
        GroupId: group.id,
        CompanyInfos: [
          {
            id: v4(),
            company_name: req.body.company.company_name,
            company_brand: req.body.company.company_brand,
            company_logo: req.body.company.company_logo,
            province: req.body.company.company_province,
            city: req.body.company.company_city,
            region: req.body.company.company_region,
          },
        ],
      },
      { include: [{ model: Company, as: "CompanyInfos" }] },
      { transaction: t }
    );

    let companyAgency = Agency.create({
      id: v4(),
      UserId: company.id,
      CompanyId: company.CompanyInfos.id,
      agency_name: req.body.company.company_name,
    });

    if (company.CompanyInfos == null || companyAgency==null) {
      throw new Error("some eror");
    }

    await t.commit();
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.sendStatus(400);
  }
};

exports.udpate_company = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let group = await Group.findOne({
      where: { name: "company" },
      attributes: ["id"],
    });
    let user = await User.findOne({
      where: { username: req.body.user.user_old_username },
      attributes: ["id"],
      include: [{ model: Company, as: "CompanyInfos", attributes: ["id"] }],
    });

    let updateUserCompany = await User.update(
      {
        username: req.body.user.user_username,
        email: req.body.user.user_email,
        password: hashPassword(req.body.user.user_password),
      },
      { where: { username: req.body.user.user_old_username }, transaction: t }
    );

    let updateConsumerInfo = await Company.update(
      {
        company_name: req.body.company.company_name,
        company_brand: req.body.company.company_brand,
        company_logo: req.body.company.company_logo,
        province: req.body.company.company_province,
        city: req.body.company.company_city,
      },
      { where: { UserId: user.id }, transaction: t }
    );

    let userCompanyId = user.CompanyInfos.id;

    let updateAgency = await Agency.update(
      {
        agency_name: req.body.company.company_name,
      },
      { where: { CompanyId: userCompanyId,UserId:user.id } }
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
