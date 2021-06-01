'use strict';
const { hashSync, genSaltSync } = require('bcryptjs');
const { SALT } = require('../constants/constants');

exports.generateHash = password => hashSync(password, genSaltSync(SALT));
