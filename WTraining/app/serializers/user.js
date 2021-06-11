exports.signInSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email
});

exports.userSerializer = user => ({
  id: user.id,
  name: user.name,
  last_name: user.lastName,
  email: user.email,
  updated_at: user.updatedAt,
  created_at: user.createdAt
});

exports.allUsersSerializer = ({ rows, count, qty }) => ({
  users: rows.map(user => this.userSerializer(user)),
  qty_page: qty,
  total: count
});
