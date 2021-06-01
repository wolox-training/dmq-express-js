'use strict';
const { hashSync, genSaltSync } = require('bcryptjs');
const { SALT } = require('../constants/constants');

const generateHash = password => hashSync(password, genSaltSync(SALT));

module.exports = { generateHash };
