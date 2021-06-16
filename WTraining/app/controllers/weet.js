'use strict';
const weetService = require('../services/weet');
const logger = require('../logger');

exports.createWeet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const weet = await weetService.getWeet();
    const response = await weetService.createWeet({ content: weet.substr(0, 140), userId });
    return res.status(201).send(response);
  } catch (e) {
    logger.error(e.ValidationErrorItem);
    return next(e);
  }
};
