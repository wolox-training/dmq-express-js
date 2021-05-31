'use strict';
const userService = require('../services/user');
const logger = require('../logger');
const { userSerializer } = require('../serializers/user');

const createUser = (req, res, next) =>
  userService
    .createUser(req.body)
    .then(userData => {
      const user = userSerializer(userData);
      logger.info('user created ', user.name);
      return res.status(201).send(user);
    })
    .catch(e => {
      logger.error(e.ValidationErrorItem);
      return next(e);
    });
module.exports = { createUser };
