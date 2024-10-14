'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate(models) {
      House.belongsToMany(models.User, {
        through: 'HouseMates',
        as: 'users',
        foreignKey: 'houseID',
      });
    }
  }
  House.init(
    {},
    {
      sequelize,
      modelName: 'House',
    }
  );
  return House;
};
