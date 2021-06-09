'use strict';
const { hashSync, genSaltSync, compareSync } = require('bcryptjs');
const { SALT } = require('../constants/constants');

exports.generateHash = password => hashSync(password, genSaltSync(SALT));
exports.verifyPassword = (password, savedPassword) => compareSync(password, savedPassword);
