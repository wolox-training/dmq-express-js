'use strict';
const { CEO } = require('../constants/constants');

exports.userLevel = (points, levels) => {
  const response = levels.find(item => points >= item.min && points < item.max);
  return response.level || CEO;
};
