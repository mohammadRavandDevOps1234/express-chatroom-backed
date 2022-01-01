'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.User.belongsTo(models.Group, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
            models.User.hasOne(models.Consumer, {
                as: "ConsumerInfos",
                foreignKey: {
                    name: "UserId",

                    allowNull: false
                },
                targetKey: 'id',
                onDelete: 'CASCADE'
            });
            models.User.hasOne(models.Store, {
                as: "StoreInfos",
                foreignKey: {
                    name: "UserId",

                    allowNull: false
                },
                targetKey: 'id',
                onDelete: 'CASCADE'
            });
            models.User.hasOne(models.Company, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
            // models.User.hasOne(models.Store , { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        }
    };

    User.init({
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        GroupId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};