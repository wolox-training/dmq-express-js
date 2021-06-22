'use strict';
const weetService = require('../services/weet');
const ratingWeetService = require('../services/weets_rating');
const { getPosition } = require('../helpers/user_level');
const { User, RatingWeet } = require('../models');

const updateCreatorWeet = (weet, score, transaction) => {
  const level = Number(weet.User.score) + Number(score);
  const position = getPosition(level);
  return User.update({ position, score: level }, { where: { id: weet.User.id } }, transaction);
};

exports.getInformationFromWeet = async (id, ratingUserId) => {
  const weet = await weetService.findOneWeet({ id });
  const rateCurrentWeet = await ratingWeetService.findOneRateWeet({ ratingUserId, weetId: id });
  return { weet, rateCurrentWeet };
};

exports.weetRatingExist = async ({ id, weet, rateCurrentWeet, score, transaction }) => {
  if (rateCurrentWeet.score === score) return rateCurrentWeet;
  await updateCreatorWeet(weet, score, transaction);
  return RatingWeet.update({ score }, { where: { id }, returning: true }, transaction);
};

exports.weetRatingDoesNotExist = async ({ id, ratingUserId, weet, score, transaction }) => {
  await updateCreatorWeet(weet, score, transaction);
  return RatingWeet.create({ ratingUserId, weetId: id, score }, transaction);
};
