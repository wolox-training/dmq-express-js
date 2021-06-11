const moment = require('moment');
const { encode, decode } = require('jwt-simple');
const config = require('../../config').common.jwt;

exports.verifyToken = token => decode(token, config.jwtSecret);
exports.generateToken = payload =>
  encode(
    {
      ...payload,
      iat: moment().unix(),
      exp: moment()
        .add(2, 'hours')
        .unix()
    },
    config.jwtSecret
  );
