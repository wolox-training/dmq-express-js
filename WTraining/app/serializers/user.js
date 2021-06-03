exports.userSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email,
  updated_at: user.updatedAt,
  created_at: user.createdAt
});
