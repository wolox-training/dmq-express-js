'use strict';
const userService = require('../services/user');
const logger = require('../logger');
const { ADMIN } = require('../constants/constants');
const { userSerializer } = require('../serializers/user');

exports.createOrUpdateAdminUser = async (user, body) => {
  const userSaved = user
    ? await userService.updateUser(user.id, { ...body, role: ADMIN })
    : await userService.createUser({ ...body, role: ADMIN });

  logger.info('user created ', userSaved.name);
  return userSerializer(userSaved);
};
