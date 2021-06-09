exports.signInSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email
});

exports.userSerializer = user => ({
  ...this.signInSerializer,
  updated_at: user.updatedAt,
  created_at: user.createdAt
});
