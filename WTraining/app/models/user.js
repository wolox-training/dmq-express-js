'use strict';
const { generateHash } = require('../helpers/bcryptjs');

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
      }
    },
    {
      underscored: true,
      tableName: 'users'
    }
  );
  return User;
};
