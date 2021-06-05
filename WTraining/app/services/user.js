'use strict';
const logger = require('../logger');
const { User } = require('../models');
const { validationError, conflictError } = require('../errors');
const { MSG_EMAIL_NOT_UNIQUE } = require('../constants/constants');

exports.createUser = user =>
  User.create(user).catch(e => {
    logger.error(e);
    throw e.message === MSG_EMAIL_NOT_UNIQUE ? conflictError(e.message) : validationError(e.message);
  });
