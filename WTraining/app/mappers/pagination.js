const { PAGE, LIMIT, ORDER_BY } = require('../constants/constants');

exports.paginationMapper = pagination => ({
  page: pagination.page || PAGE,
  limit: pagination.limit || LIMIT,
  orderBy: pagination.order_by || ORDER_BY,
  offset: pagination.limit * (pagination.page - 1)
});
