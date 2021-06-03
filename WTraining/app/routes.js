const { healthCheck } = require('./controllers/health_check');
const { createUser } = require('./controllers/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', createUser);
};
