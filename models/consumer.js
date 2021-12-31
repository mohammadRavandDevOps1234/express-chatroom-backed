'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Consumer extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.Consumer.belongsTo(models.User, {
                foreignKey: {
                    as: "UserId",
                    allowNull: false,
                    targetKey: 'id',
                },
                onDelete: 'CASCADE'
            });
            models.Consumer.belongsToMany(models.Store, { through: 'ConsumerStores', as: 'nearConsumerStore', foreignKey: { name: "ConsumerId", allowNull: false }, otherKey: "StoreId", onDelete: 'CASCADE' });
            // models.Consumer.belongsTo(models.Store, { through: 'ConsumerStore', foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
            // models.Consumer.hasMany(models.ConsumerStore, {
            //     as: "ConsumerStoreA",
            //     foreignKey: { allowNull: false },
            //     onDelete: 'CASCADE'
            // });
            // models.Consumer.belongsTo(models.ConsumerStore, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });
        }
    };
    Consumer.init({
        UserId: DataTypes.UUID,
        consumer_name: DataTypes.STRING,
        consumer_lat: DataTypes.STRING,
        consumer_lng: DataTypes.STRING,
        province_id: DataTypes.INTEGER,
        city_id: DataTypes.INTEGER,
        region_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Consumer',
    });
    return Consumer;
};