'use strict';
const { hashSync, genSaltSync } = require('bcryptjs');

const generateHash = password => hashSync(password, genSaltSync(10));

module.exports = { generateHash };
