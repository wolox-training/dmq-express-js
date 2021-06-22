'use strict';

module.exports = (sequelize, DataTypes) => {
  const Weet = sequelize.define(
    'Weet',
    {
      content: { type: DataTypes.STRING, allowNull: false }
    },
    { underscored: true, tableName: 'weets' }
  );
  Weet.associate = models => {
    Weet.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Weet;
};
