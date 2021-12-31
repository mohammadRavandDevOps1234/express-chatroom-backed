'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Store extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // models.Store.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
            // models.Store.hasMany(models.ConsumerStore, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
            models.Store.belongsToMany(models.Consumer, { through: 'ConsumerStores', as: 'nearConsumerStore', foreignKey: { name: "StoreId", allowNull: false }, otherKey: "ConsumerId", onDelete: 'CASCADE' });

            // models.Store.belongsTo(models.ConsumerStore, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        }
    };
    Store.init({
        UserId: DataTypes.UUID,
        store_name: DataTypes.STRING,
        store_lat: DataTypes.STRING,
        store_lng: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        region_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Store',
    });
    return Store;
};