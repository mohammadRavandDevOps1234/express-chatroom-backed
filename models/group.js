'use strict';
const { v4 } = require('uuid');

const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Group.hasOne(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        }



    };
    Group.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Group',
    });
    return Group;
};