'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-z]+$/],
          msg: 'The name must be string.'
        }
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: [/^[A-Za-z]+$/i],
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
          args: [/^(([^<>(),;:\s@"]+(.[^<>(),;:\s@"]+)*)|(.+"))@((wolox+.)+[^<>()[,;:\s@"]{2,})$/],
          msg: 'The email must be valid and must belong to the Wolox email domain.'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (!/[a-zA-z0-9]{8,}$/i.test(value)) {
          throw new Error('The password must be alphanumeric, with a minimum length of 8 characters.');
        }
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      }
    }
  });
  return User;
};
