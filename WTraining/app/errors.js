const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.VALIDATION_ERROR = 'validation_error';
exports.validationError = message => internalError(message, exports.VALIDATION_ERROR);

exports.CONFLICT_ERROR = 'conflict_error';
exports.conflictError = message => internalError(message, exports.CONFLICT_ERROR);

exports.USER_ERROR = 'user_error';
exports.userError = message => internalError(message, exports.USER_ERROR);

exports.UNAUTHORIZED_ERROR = 'unauthorized_error';
exports.unauthorizedError = message => internalError(message, exports.UNAUTHORIZED_ERROR);

exports.FORBIDDEN_ERROR = 'forbbiden_error';
exports.forbbidenError = message => internalError(message, exports.FORBIDDEN_ERROR);
