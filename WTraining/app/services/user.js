'use strict';
const { users } = require('../models');

const createUser = user =>
  users
    .create(user)
    .then(res => res)
    .catch(e => {
      throw e;
    });

module.exports = {
  createUser
};
