'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HouseMates extends Model {
    static associate(models) {}
  }
  HouseMates.init(
    {
      houseID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'House',
          key: 'id',
        },
      },
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: {
          model: 'User',
          key: 'username',
        },
      },
    },
    {
      sequelize,
      modelName: 'HouseMates',
    }
  );
  return HouseMates;
};
