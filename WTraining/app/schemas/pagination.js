'use strict';

exports.paginationValidation = {
  page: {
    in: ['query'],
    isInt: true,
    toInt: true
  },
  limit: {
    in: ['query'],
    isInt: true,
    toInt: true
  }
};
