const { healthCheck } = require('./controllers/health_check');
const { createUser } = require('./controllers/user');
const { user_validation } = require('./schemas/user');
const { validateSchema } = require('./middlewares/validations');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [validateSchema(user_validation)], createUser);
};
