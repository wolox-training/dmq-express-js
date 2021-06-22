'use strict';
const weetService = require('../services/weet');
const logger = require('../logger');
const db = require('../models');
const { paginationMapper } = require('../mappers/pagination');
const { countPerPage } = require('../helpers/count');
const { allWeetsSerializer } = require('../serializers/weet');
const { SUBSTR_START, SUBSTR_END } = require('../constants/constants');
const {
  weetRatingDoesNotExist,
  weetRatingExist,
  getInformationFromWeet
} = require('../interactors/weets_rating');

exports.findAllWeet = (req, res, next) => {
  const pagination = paginationMapper(req.query);

  return weetService
    .findAllWeet(pagination)
    .then(weets => {
      const qty = countPerPage(weets.count, req.query.limit);
      const response = allWeetsSerializer({ ...weets, qty });
      return res.status(200).send(response);
    })
    .catch(e => {
      logger.error(e.ValidationErrorItem);
      return next(e);
    });
};

exports.createWeet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const weet = await weetService.getWeet();
    const response = await weetService.createWeet({ content: weet.substr(SUBSTR_START, SUBSTR_END), userId });
    return res.status(201).send(response);
  } catch (e) {
    logger.error(e.ValidationErrorItem);
    return next(e);
  }
};

exports.rateWeet = async (req, res, next) => {
  const ratingUserId = req.user.id;
  const { id } = req.params;
  const { score } = req.body;

  let transaction = {};

  try {
    transaction = await db.sequelize.transaction();
    const { weet, rateCurrentWeet } = await getInformationFromWeet(id, ratingUserId);

    const response = rateCurrentWeet
      ? await weetRatingExist({ id, weet, score, rateCurrentWeet, transaction })
      : await weetRatingDoesNotExist({ id, weet, score, ratingUserId, transaction });

    await transaction.commit();
    logger.info('successfully saved ', response.id);
    return res.status(200).send(response);
  } catch (e) {
    if (transaction.rollback) await transaction.rollback();
    logger.error(e);
    return next(e);
  }
};
