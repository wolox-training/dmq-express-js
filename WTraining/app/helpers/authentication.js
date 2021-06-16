const moment = require('moment');
const { encode } = require('jwt-simple');
const config = require('../../config').common.jwt;

exports.generateToken = ({ id, name, email }) =>
  encode(
    {
      id,
      name,
      email,
      iat: moment().unix(),
      exp: moment()
        .add(config.jwtExpire, 'seconds')
        .unix()
    },
    config.jwtSecret
  );
