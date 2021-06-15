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
const { ADMIN } = require('../constants/constants');

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
    .findByEmailUser(req.body.email)
    .then(user => {
      if (!user) throw unauthorizedError('wrong user or password');

      const { password } = req.body;

      const comparisonResult = verifyPassword(password, user.password);
      if (!comparisonResult) throw unauthorizedError('wrong user or password');

      const token = generateToken(user);
      const userData = signInSerializer(user);

      return res.status(200).send({ ...userData, token });
    })
    .catch(e => {
      logger.error(e);
      return next(e);
    });
exports.createAdminUser = async (req, res, next) => {
  try {
    if (req.user.role !== ADMIN) throw unauthorizedError('Does not have the necessary permits');
    const dataUser = userMapper(req.body);
    const responseUser = await userService.findByEmailUser(dataUser.email);

    const response = responseUser
      ? await userService.updateUser(responseUser.id, { ...dataUser, role: ADMIN })
      : await userService.createUser({ ...dataUser, role: ADMIN });

    const user = userSerializer(response);
    logger.info('user created ', user.name);
    return res.status(201).send(user);
  } catch (e) {
    logger.error(e);
    return next(e);
  }
};
