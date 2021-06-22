'use strict';
const weetService = require('../services/weet');
const logger = require('../logger');
const { paginationMapper } = require('../mappers/pagination');
const { countPerPage } = require('../helpers/count');
const { allWeetsSerializer } = require('../serializers/weet');
const { SUBSTR_START, SUBSTR_END } = require('../constants/constants');

exports.findAllWeet = (req, res, next) => {
  const pagination = paginationMapper(req.query);

  return weetService
    .findAllWeet(pagination)
    .then(weets => {
      const totalPage = countPerPage(weets.count, req.query.limit);
      const response = allWeetsSerializer({ ...weets, ...pagination, totalPage });
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
