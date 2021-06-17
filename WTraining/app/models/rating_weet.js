'use strict';
module.exports = (sequelize, DataTypes) => {
  const RatingWeet = sequelize.define(
    'RatingWeet',
    {
      score: { type: DataTypes.INTEGER, allowNull: false }
    },
    { underscored: true, tableName: 'rating_weets' }
  );
  RatingWeet.associate = models => {
    RatingWeet.belongsTo(models.User, { foreignKey: 'ratingUserId' });
    RatingWeet.belongsTo(models.Weet, { foreignKey: 'weetId' });
  };
  return RatingWeet;
};
