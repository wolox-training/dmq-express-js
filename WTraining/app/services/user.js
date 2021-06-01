'use strict';
const logger = require('../logger');
const { User } = require('../models');

exports.createUser = user =>
  User.create(user).catch(e => {
    logger.error(e);
    throw e;
  });
