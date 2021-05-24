'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      name: {
        types: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        types: DataTypes.STRING,
        allowNull: false
      },
      email: {
        types: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        types: DataTypes.STRING,
        allowNull: false
      }
    },
    { timestamps: false }
  );
  return User;
};
