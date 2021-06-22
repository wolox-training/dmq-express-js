'use strict';
const logger = require('../logger');
const { databaseError } = require('../errors');
const { RatingWeet } = require('../models');

exports.findOneRateWeet = ({ ratingUserId, weetId }) =>
  RatingWeet.findOne({
    where: { ratingUserId, weetId }
  }).catch(e => {
    logger.error(e);
    throw databaseError(e.message);
  });
