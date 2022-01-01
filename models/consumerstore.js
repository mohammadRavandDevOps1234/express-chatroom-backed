'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ConsumerStore extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            models.ConsumerStore.belongsTo(models.Room, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' });

        }
    };
    ConsumerStore.init({
        StoreId: DataTypes.UUID,
        ConsumerId: DataTypes.UUID,
        RoomId: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'ConsumerStore',
    });
    return ConsumerStore;
};