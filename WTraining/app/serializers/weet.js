const { countPerPage, previousPage, nextPage } = require('../helpers/count');

exports.allWeetsSerializer = ({ rows, count, totalPage, page, limit, offset }) => ({
  weets: rows.map(weet => this.weetSerializer(weet)),
  total_page: countPerPage(count, limit),
  total_count: count,
  previous_page: previousPage(offset, page),
  current_page: page,
  next_page: nextPage(totalPage, page)
});

exports.weetSerializer = weet => ({
  id: weet.id,
  content: weet.content,
  creator: weet.User.email,
  updated_at: weet.updatedAt,
  created_at: weet.createdAt
});
