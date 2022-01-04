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

exports.register_agency_activityArea = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let userCompany = await User.findOne({
      where: { username: req.body.agencyUsername },
      attributes: ["id"],
      include: [{ model: Agency, as: "UserAgency", attributes: ["id"] }],
    });

    let mainActivityAreas = [];

    req.body.activityArea.map((activityArea) => {
      if (activityArea.region.length) {
        activityArea.region.forEach((region) => {
          mainActivityAreas.push({
            AgencyId: userCompany.UserAgency.id,
            province: activityArea.province,
            city: activityArea.city,
            region: region,
          });
        });
      } else {
        activityArea.AgencyId = userCompany.UserAgency.id;
        activityArea.region = 0;
        mainActivityAreas.push(activityArea);
      }
    });

    let agencyActivityAreas = await Promise.all(
      mainActivityAreas.map((activity) => {
        return AgencyActivity.create({ id: v4(), ...activity });
      })
    );

    await t.commit();
    res.sendStatus(201);
    // res.sendStatus(201);
  } catch (error) {
    console.log(error);
    await t.rollback();
    res.sendStatus(400);
  }
};

exports.udpate_agency_activityArea = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    let userCompany = await User.findOne({
      where: { username: req.body.agencyUsername },
      attributes: ["id"],
      include: [{ model: Agency, as: "UserAgency", attributes: ["id"] }],
    });

    let mainActivityAreas = [];

    req.body.activityArea.map((activityArea) => {
      if (activityArea.region.length) {
        activityArea.region.forEach((region) => {
          mainActivityAreas.push({
            AgencyId: userCompany.UserAgency.id,
            province: activityArea.province,
            city: activityArea.city,
            region: region,
          });
        });
      } else {
        activityArea.AgencyId = userCompany.UserAgency.id;
        activityArea.region = 0;
        mainActivityAreas.push(activityArea);
      }
    });

    let agencyActivityAreas = await Promise.all(
      mainActivityAreas.map((activity) => {
        return AgencyActivity.findOrCreate({
          where: {
            [Op.and]:[
              {AgencyId:  activity.AgencyId},
              {province:  activity.province},
              {city:  activity.city},
              {region:  activity.region}
            ]
          },
          defaults: { id: v4(), ...activity },
          transaction: t,
        });
      })
    );


    // remove activity areas
    mainActivityAreas = [];

    req.body.removeActivityArea.map((removeActivityArea) => {
      if (removeActivityArea.region.length) {
        removeActivityArea.region.forEach((region) => {
          mainActivityAreas.push({
            AgencyId: userCompany.UserAgency.id,
            province: removeActivityArea.province,
            city: removeActivityArea.city,
            region: region,
          });
        });
      } else {
        removeActivityArea.AgencyId = userCompany.UserAgency.id;
        removeActivityArea.region = 0;
        mainActivityAreas.push(removeActivityArea);
      }
    });


    let removeAgencyActivityAreas = await Promise.all(
      mainActivityAreas.map((activity) => {
        return AgencyActivity.destroy({
          where: {
            [Op.and]:[
              {AgencyId:  activity.AgencyId},
              {province:  activity.province},
              {city:  activity.city},
              {region:  activity.region}
            ]
          },
          transaction: t,
        });
      })
    );





    await t.commit();
    res.sendStatus(200);
    // res.sendStatus(201);
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
