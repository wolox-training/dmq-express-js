const sgMail = require('@sendgrid/mail');
const config = require('../../config').common.sendgrid;
const logger = require('../logger');

sgMail.setApiKey(config.sendgridKey);

exports.sendMail = msg => {
  sgMail
    .send(msg)
    .then(() => {
      logger.info('Email sent');
      return 'Email sent';
    })
    .catch(e => {
      logger.info(e);
      throw e;
    });
};
