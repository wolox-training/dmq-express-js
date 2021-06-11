'use strict';
const userService = require('../services/user');
const logger = require('../logger');
const { userSerializer, signInSerializer, allUsersSerializer } = require('../serializers/user');
const { paginationMapper } = require('../mappers/pagination');
const { userMapper } = require('../mappers/user');
const { verifyPassword } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/authentication');
const { unauthorizedError } = require('../errors');
const { countPerPage } = require('../helpers/count');

exports.findAllUser = async (req, res, next) => {
  try {
    const pagination = paginationMapper(req.query);
    const offset = pagination.limit * (pagination.page - 1);

    const userData = await userService.findAllUser({ ...pagination, offset });
    const qty = countPerPage(userData.count, req.query.limit);
    const response = allUsersSerializer({ ...userData, qty });

    return res.status(200).send(response);
  } catch (e) {
    logger.error(e.ValidationErrorItem);
    return next(e);
  }
};

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
      if (!user) throw unauthorizedError('wrong user or password');

      const { password } = req.body;

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
