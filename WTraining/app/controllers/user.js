'use strict';
const userService = require('../services/user');
const logger = require('../logger');

const createUser = (req, res, next) =>
  userService
    .createUser(req.body)
    .then(user => {
      delete user.dataValues.password;
      logger.info(user.dataValues.name);
      return res.status(201).send(user);
    })
    .catch(e => {
      logger.error(e.ValidationErrorItem);
      next(e);
    });
module.exports = { createUser };
