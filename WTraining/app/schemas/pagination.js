'use strict';

exports.paginationValidation = {
  page: {
    in: ['query'],
    isInt: {
      options: {
        min: 1
      },
      errorMessage: 'The page must have a positive value'
    },
    toInt: true
  },
  limit: {
    in: ['query'],
    isInt: {
      options: {
        min: 1
      },
      errorMessage: 'The limit must have a positive value'
    },
    toInt: true
  }
};
