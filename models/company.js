'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Company extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            models.Company.hasMany(models.Agency, {
                as: "CompanyAgency",
                foreignKey: {
                    name: "CompanyId",
                    allowNull: false
                },
                targetKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            });

            models.Company.belongsTo(models.User, {
                foreignKey: {
                    as: "UserId",
                    allowNull: false,
                    targetKey: 'id',
                },
                onDelete: 'CASCADE'
            });
        }
    };
    Company.init({
        UserId: DataTypes.UUID,
        company_name: DataTypes.STRING,
        company_brand:DataTypes.STRING,
        company_logo: DataTypes.STRING,
        province: DataTypes.INTEGER,
        city: DataTypes.INTEGER,
        region: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Company',
    });
    return Company;
};