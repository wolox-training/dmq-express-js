'use strict';

exports.rateWeetValidation = {
  id: {
    in: ['params'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true
  },
  score: {
    exists: {
      errorMessage: 'Score should not be empty',
      bail: true
    },
    isNumeric: {
      errorMessage: 'Score should be at numeric',
      bail: true
    },
    custom: {
      options: score => score === -1 || score === 1,
      errorMessage: 'The score is not valid',
      bail: true
    }
  }
};
