const { healthCheck } = require('./controllers/health_check');
const { createUser, signIn, findAllUser } = require('./controllers/user');
const { userValidation, signInValidation } = require('./schemas/user');
const { validateSchema } = require('./middlewares/validations');
const { validateToken } = require('./middlewares/authentication');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateToken], findAllUser);
  app.post('/users', [validateSchema(userValidation)], createUser);
  app.post('/users/sessions', [validateSchema(signInValidation)], signIn);
};
