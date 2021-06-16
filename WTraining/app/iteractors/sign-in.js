const { verifyPassword } = require('../helpers/bcryptjs');
const { unauthorizedError } = require('../errors');
const { signInSerializer } = require('../serializers/user');
const { generateToken } = require('../helpers/authentication');

exports.verifyUserAndPassword = (user, password) => {
  if (!user) throw unauthorizedError('wrong user or password');
  const comparisonResult = verifyPassword(password, user.password);
  if (!comparisonResult) throw unauthorizedError('wrong user or password');
};

exports.returnDataWithToken = user => {
  const token = generateToken(user);
  const userData = signInSerializer(user);
  return { ...userData, token };
};
