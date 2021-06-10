const { encode } = require('jwt-simple');
const config = require('../../config').common.jwt;

exports.generateToken = payload => encode(payload, config.jwtSecret);

