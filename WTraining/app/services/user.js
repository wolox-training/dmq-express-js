'use strict';
const logger = require('../logger');
const { User } = require('../models');
const { databaseError, conflictError } = require('../errors');
const { MSG_EMAIL_NOT_UNIQUE } = require('../constants/constants');

exports.findAllUser = ({ limit, orderBy, offset }) =>
  User.findAndCountAll({
    offset,
    limit,
    order: [[orderBy]]
  }).catch(e => {
    logger.error(e);
    throw databaseError(e.message);
  });

exports.createUser = user =>
  User.create(user).catch(e => {
    logger.error(e);
    throw e.message === MSG_EMAIL_NOT_UNIQUE ? conflictError(e.message) : databaseError(e.message);
  });

exports.updateUser = (id, user) =>
  User.update(user, { where: { id } })
    .then(() => ({ ...user, id }))
    .catch(e => {
      logger.error(e);
      throw databaseError(e.message);
    });

exports.findByEmailUser = email =>
  User.findOne({ where: { email } }).catch(e => {
    logger.error(e);
    throw databaseError(e.message);
  });
