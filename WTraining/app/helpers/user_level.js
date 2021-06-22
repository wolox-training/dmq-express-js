'use strict';
const {
  DEVELOPER,
  LEAD,
  TL,
  EM,
  HEAD,
  CEO,
  IS_DEV,
  IS_EM,
  IS_HEAD,
  IS_LEAD,
  IS_TL
} = require('../constants/constants');

const getPositionDev = score => (score < IS_DEV ? DEVELOPER : LEAD);
const getPositionMedium = score => (score >= IS_LEAD && score < IS_TL ? TL : EM);
const getPositionLeads = score => (score >= IS_HEAD ? CEO : HEAD);

exports.getPosition = score => {
  let response = '';
  if (score < IS_LEAD) response = getPositionDev(score);
  if (score >= IS_LEAD && score < IS_EM) response = getPositionMedium(score);
  if (score >= IS_EM) response = getPositionLeads(score);
  return response;
};
