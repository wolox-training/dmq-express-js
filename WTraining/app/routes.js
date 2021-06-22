const { healthCheck } = require('./controllers/health_check');
const { createUser, signIn, findAllUser, createAdminUser } = require('./controllers/user');
const { createWeet, findAllWeet, rateWeet } = require('./controllers/weet');
const { userValidation, signInValidation } = require('./schemas/user');
const { paginationValidation } = require('./schemas/pagination');
const { rateWeetValidation } = require('./schemas/weets_rating');
const { validateSchema } = require('./middlewares/validations');
const { validateToken } = require('./middlewares/authentication');

exports.init = app => {
  app.get('/health', healthCheck);
  app.get('/users', [validateToken], findAllUser);
  app.post('/users', [validateSchema(userValidation)], createUser);
  app.post('/users/sessions', [validateSchema(signInValidation)], signIn);
  app.post('/admin/users', [validateToken, validateSchema(signInValidation)], createAdminUser);
  app.get('/weets', [validateToken, validateSchema(paginationValidation)], findAllWeet);
  app.post('/weets', [validateToken], createWeet);
  app.post('/weets/:id/ratings', [validateToken, validateSchema(rateWeetValidation)], rateWeet);
};
