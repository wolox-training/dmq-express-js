'use strict';

const { requestGet } = require('../helpers/request');
const logger = require('../logger');

const URL = process.env.ULR_WEET;

exports.getWeet = () =>
  requestGet(URL)
    .then(res => res.data)
    .catch(e => {
      logger.error(e);
      throw e;
    });
