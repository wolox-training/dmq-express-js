exports.allWeetsSerializer = ({ rows, count, qty }) => ({
  weets: rows.map(weet => this.weetSerializer(weet)),
  qty_page: qty,
  total: count
});

exports.weetSerializer = weet => ({
  id: weet.id,
  content: weet.content,
  creator: weet.User.email,
  updated_at: weet.updatedAt,
  created_at: weet.createdAt
});
