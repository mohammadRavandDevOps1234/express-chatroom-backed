"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agency extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // CompanyAgency
      models.Agency.belongsTo(models.Company, {
        foreignKey: {
          as: "CompanyId",
          allowNull: false,
          targetKey: "id",
        },
        onDelete: "CASCADE",
      });

      models.Agency.hasMany(models.AgencyActivity, {
        as: "AgencyActivityAreas",
        foreignKey: {
          name: "AgencyId",
          allowNull: false,
        },
        targetKey: "id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      models.Agency.belongsTo(models.User, {
        foreignKey: {
            as: "UserId",
            allowNull: false,
            targetKey: 'id',
        },
        onDelete: 'CASCADE'
    });


    }
    
  }
  Agency.init(
    {
      CompanyId: DataTypes.UUID,
      agency_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Agency",
    }
  );
  return Agency;
};
