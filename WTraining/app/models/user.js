'use strict';
const { validateEmail, validatePassword, validateString } = require('../constants');
const { databaseError } = require('../errors');
const { generateHash } = require('../helpers/bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [validateString],
            msg: 'The name must be string.'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [validateString],
            msg: 'The last name must be string.'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email is already in use.'
        },
        validate: {
          is: {
            args: [validateEmail],
            msg: 'The email must be valid and must belong to the Wolox email domain.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          if (!validatePassword(value)) {
            throw databaseError('The password must be alphanumeric, with a minimum length of 8 characters.');
          }
          const hash = generateHash(value);
          this.setDataValue('password', hash);
        }
      }
    },
    {
      underscored: true
    }
  );
  return User;
};
