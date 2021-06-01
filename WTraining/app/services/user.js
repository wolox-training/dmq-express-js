'use strict';
const logger = require('../logger');
const { User } = require('../models');

const createUser = user =>
  User.create(user).catch(e => {
    logger.error(e);
    throw e;
  });

module.exports = {
  createUser
};
