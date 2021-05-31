const userSerializer = user => ({
  id: user.dataValues.id,
  name: user.dataValues.name,
  last_name: user.dataValues.last_name,
  email: user.dataValues.email,
  updated_at: user.dataValues.updatedAt,
  created_at: user.dataValues.createdAt
});

module.exports = { userSerializer };
