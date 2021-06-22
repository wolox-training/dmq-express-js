'use strict';
const { generateHash } = require('../helpers/bcryptjs');
const { REGULAR, DEVELOPER } = require('../constants/constants');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email is already in use'
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          const hash = generateHash(value);
          this.setDataValue('password', hash);
        }
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: REGULAR,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        defaultValue: DEVELOPER,
        allowNull: false
      },
      score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );
  return User;
};
