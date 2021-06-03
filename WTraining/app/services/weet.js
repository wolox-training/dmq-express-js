'use strict';
const { requestGet } = require('../helpers/request');
const logger = require('../logger');
const config = require('../../config').common.url;

exports.getWeet = () =>
  requestGet(config.urlWeet)
    .then(res => res.data)
    .catch(e => {
      logger.error(e);
      throw e;
    });
