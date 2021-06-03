'use strict';

const axios = require('axios');
const logger = require('../logger');

const getWeet = () =>
  axios
    .get('https://geek-jokes.sameerkumar.website/api?format=json')
    .then(res => res.data)
    .catch(e => logger.error(e));

module.exports = {
  getWeet
};
