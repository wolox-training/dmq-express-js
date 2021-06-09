'use strict';
const userService = require('../services/user');
const logger = require('../logger');
const { userSerializer, signInSerializer } = require('../serializers/user');
const { userMapper } = require('../mappers/user');
const { verifyPassword } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/authentication');
const { unauthorizedError } = require('../errors');

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
    .findOneUser(req.body.email)
    .then(user => {
      const { password } = req.body;

      console.log(user);

      const comparisonResult = verifyPassword(password, user.password);
      if (!comparisonResult) throw unauthorizedError('wrong user or password');

      const payload = {
        id: user.id,
        name: user.name,
        email: user.email
      };

      const token = generateToken(payload);
      const userData = signInSerializer(user);

      return res.status(200).send({ ...userData, token });
    })
    .catch(e => {
      logger.error(e);
      return next(e);
    });
