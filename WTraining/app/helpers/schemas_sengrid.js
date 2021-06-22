const config = require('../../config').common.sendgrid;
const { NAME_SENGRID, SUBJECT_SENGRID } = require('../constants/constants');

exports.welcomeMsg = ({ email }) => ({
  to: email,
  from: {
    email: config.sendgridEmail,
    name: NAME_SENGRID
  },
  subject: SUBJECT_SENGRID,
  html: `<h2><strong>Welcome ${email}</strong></h2>`
});
