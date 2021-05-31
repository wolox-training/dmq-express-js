'use strict';
const logger = require('../logger');
const { User } = require('../models');

const createUser = user =>
  User.create(user)
    .then(res => res)
    .catch(e => {
      logger.error(e);
      throw e;
    });

module.exports = {
  createUser
};
