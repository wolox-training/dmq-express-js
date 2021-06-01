const userMapper = user => ({
  name: user.name,
  lastName: user.last_name,
  email: user.email,
  password: user.password
});

module.exports = { userMapper };
