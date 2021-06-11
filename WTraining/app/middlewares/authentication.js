const moment = require('moment');
const { forbbidenError, unauthorizedError } = require('../errors');
const { verifyToken } = require('../helpers/authentication');
const logger = require('../logger');

exports.validateToken = async (req, _, next) => {
  try {
    const { authorization } = req.headers;

    console.log('ESTO LLEGA EN EL HEADER => ', authorization);

    let auth = authorization || '';
    if (!auth.startsWith('Bearer')) throw forbbidenError('Invalid');
    auth = auth.split(' ');

    const split = authorization.split(' ');
    if (split.length !== 2) throw forbbidenError('Forbbiden');

    const token = split[1];
    console.log('RESULTADO DEL TOKEN => ', token);
    const payload = await verifyToken(token);

    if (payload.exp <= moment.unix()) throw unauthorizedError('Token expired');

    next();
  } catch (error) {
    logger.error(error);
    if (error.name === 'SyntaxError') next(unauthorizedError('Unauthorized'));
    next(error);
  }
};
