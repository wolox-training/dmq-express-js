const { encode } = require('jwt-simple');
const config = require('../../config').common.jwt;

exports.generateToken = payload => {
  console.log(payload);
  console.log(encode(payload, config.jwtSecret, 'HS256'));
  return encode(payload, config.jwtSecret);
};
