'use strict';
const { VALIDATE_EMAIL, VALIDATE_STRING } = require('../constants/constants');
const { validatePassword } = require('../helpers/validate_password');
const { validationError } = require('../errors');
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
            args: [VALIDATE_STRING],
            msg: 'The name must be string.'
          }
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: [VALIDATE_STRING],
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
            args: [VALIDATE_EMAIL],
            msg: 'The email must be valid and must belong to the Wolox email domain.'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          if (!validatePassword(value)) {
            throw validationError(
              'The password must be alphanumeric, with a minimum length of 8 characters.'
            );
          }
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
