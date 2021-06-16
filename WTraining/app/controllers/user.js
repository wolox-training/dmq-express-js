'use strict';
const userService = require('../services/user');
const logger = require('../logger');
const { userSerializer } = require('../serializers/user');
const { userMapper } = require('../mappers/user');
const { verifyUserAndPassword, returnDataWithToken } = require('../iteractors/sign-in');

exports.createUser = (req, res, next) => {
  const dataUser = userMapper(req.body);

  return userService
    .createUser(dataUser)
    .then(userData => {
      const user = userSerializer(userData);
      logger.info('user created ', user.name);
      return res.status(201).send(user);
    })
    .catch(e => {
      logger.error(e.ValidationErrorItem);
      return next(e);
    });
};

exports.signIn = (req, res, next) =>
  userService
    .findByEmailUser(req.body.email)
    .then(user => {
      verifyUserAndPassword(user, req.body.password);
      const response = returnDataWithToken(user);
      return res.status(200).send(response);
    })
    .catch(e => {
      logger.error(e);
      return next(e);
    });
