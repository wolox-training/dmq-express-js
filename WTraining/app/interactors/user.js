'use strict';
const userService = require('../services/user');
const { userMapper } = require('../mappers/user');
const { welcomeMsg } = require('../helpers/schemas_sengrid');
const { sendMail } = require('../helpers/mail');

exports.createUserInteractor = body => {
  const dataUser = userMapper(body);
  return userService.createUser(dataUser);
};

exports.sendWelcomeEmailInteractor = user => {
  const msg = welcomeMsg(user);
  return sendMail(msg);
};
