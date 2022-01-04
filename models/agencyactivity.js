'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AgencyActivity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.AgencyActivity.belongsTo(models.Agency, {
        foreignKey: {
            as: "AgencyId",
            allowNull: false,
            targetKey: 'id',
        },
        onDelete: 'CASCADE'
    });
    }
  };
  AgencyActivity.init({
    AgencyId: DataTypes.UUID,
    province: DataTypes.INTEGER,
    city: DataTypes.INTEGER,
    region: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AgencyActivity',
  });
  return AgencyActivity;
};