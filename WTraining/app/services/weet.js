'use strict';
const { requestGet } = require('../helpers/request');
const { validationError } = require('../errors');
const logger = require('../logger');
const config = require('../../config').common.weetService;

exports.getWeet = () =>
  requestGet(config.url)
    .then(res => res.data)
    .catch(e => {
      logger.error(e);
      throw validationError(e);
    });
