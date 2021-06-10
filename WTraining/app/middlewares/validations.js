'use strict';

const { checkSchema, validationResult } = require('express-validator');
const { validationError } = require('../errors');

const checkValidationResult = (request, _, next) => {
  const errorsResult = validationResult(request);

  if (!errorsResult.isEmpty()) {
    const errors = errorsResult.array().map(err => ({
      msg: err.msg,
      location: 'request',
      param: err.param
    }));
    return next(validationError(errors));
  }
  return next();
};
exports.validateSchema = schema => [checkSchema(schema), checkValidationResult];
