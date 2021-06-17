'use strict';
const logger = require('../logger');
const config = require('../../config').common.weetService;
const { requestGet } = require('../helpers/request');
const { validationError, databaseError } = require('../errors');
const { Weet } = require('../models');

exports.getWeet = () =>
  requestGet(config.url)
    .then(res => res.data.joke)
    .catch(e => {
      logger.error(e);
      throw validationError(e);
    });

exports.createWeet = weet =>
  Weet.create(weet).catch(e => {
    logger.error(e);
    throw databaseError(e.message);
  });

exports.findAllWeet = ({ limit, orderBy, offset, id }) =>
  Weet.findAndCountAll({
    offset,
    limit,
    order: [[orderBy]],
    where: { userId: id }
  }).catch(e => {
    logger.error(e);
    throw databaseError(e.message);
  });
