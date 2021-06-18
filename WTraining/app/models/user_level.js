'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserLevel = sequelize.define(
    'UserLevel',
    {
      level: DataTypes.STRING,
      min: DataTypes.INTEGER,
      max: DataTypes.INTEGER
    },
    { timestamps: false, underscored: true, tableName: 'user_level' }
  );
  return UserLevel;
};
