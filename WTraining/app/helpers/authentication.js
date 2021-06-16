const moment = require('moment');
const { encode, decode } = require('jwt-simple');
const config = require('../../config').common.jwt;

exports.verifyToken = token => decode(token, config.jwtSecret);
exports.generateToken = ({ id, name, email, role }) =>
  encode(
    {
      id,
      name,
      email,
      role,
      iat: moment().unix(),
      exp: moment()
        .add(config.jwtExpire, 'seconds')
        .unix()
    },
    config.jwtSecret
  );
