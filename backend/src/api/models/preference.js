'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User, {
        foreignKey: 'username',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }
  Preference.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      apartment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      house: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      condo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      nightPerson: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      morningPerson: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      extrovert: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      introvert: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      smoker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      bringFriendsOver: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      loud: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      shareFood: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pet: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      messy: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      clean: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      relationship: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Preference',
      timestamps: true,
    }
  );
  return Preference;
};
