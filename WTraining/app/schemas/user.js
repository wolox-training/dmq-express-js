'use strict';
const { validateEmail } = require('../helpers/validate_email');

exports.signInValidation = {
  password: {
    exists: {
      errorMessage: 'Password should not be empty',
      bail: true
    },
    isLength: {
      errorMessage: 'Password should be at least 8 chars long',
      options: { min: 8 },
      bail: true
    },
    isAlphanumeric: {
      errorMessage: 'Password should be at alphanumeric',
      bail: true
    }
  },
  email: {
    exists: {
      errorMessage: 'Email should not be empty',
      bail: true
    },
    trim: {
      options: ' '
    },
    custom: {
      options: email => validateEmail(email),
      errorMessage: 'The email should be valid and must belong to the Wolox email domain',
      bail: true
    }
  }
};

exports.userValidation = {
  name: {
    exists: {
      errorMessage: 'Name should not be empty',
      bail: true
    },
    trim: {
      options: ' '
    },
    isAlpha: {
      errorMessage: 'The name sould be string',
      bail: true
    }
  },
  last_name: {
    exists: {
      errorMessage: 'Last name should not be empty',
      bail: true
    },
    trim: {
      options: ' '
    },

    isAlpha: {
      errorMessage: 'The last name sould be string',
      bail: true
    }
  },
  ...this.signInValidation
};
