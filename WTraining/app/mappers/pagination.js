exports.paginationMapper = pagination => ({
  page: pagination.page || 1,
  limit: pagination.limit || 50,
  orderBy: pagination.order_by || 'id'
});
