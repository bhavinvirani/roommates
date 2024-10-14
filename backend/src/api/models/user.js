'use strict';
const { Model } = require('sequelize');
const { jwtConfig } = require('../../config/constants');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Preference, { foreignKey: 'username', as: 'preference' });
      User.hasMany(models.Request, { foreignKey: 'from', as: 'fromUser' });
      User.hasMany(models.Request, { foreignKey: 'to', as: 'toUser' });
      User.belongsToMany(models.House, { foreignKey: "username", through: 'HouseMates', as: 'houses' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      photoID: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      desiredRoommates: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      hasResidence: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: true,
      defaultScope: {
        attributes: { exclude: ['password', 'refreshToken'] },
      },
    }
  );

  User.beforeCreate(async (user) => {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, jwtConfig.saltRounds);
      user.password = hashedPassword;
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const hashedPassword = await bcrypt.hash(user.password, jwtConfig.saltRounds);
      user.password = hashedPassword;
    }
  });

  return User;
};
