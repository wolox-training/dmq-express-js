const { PAGE } = require('../constants/constants');

exports.countPerPage = (count, limit) => Math.ceil(count / limit);
exports.previousPage = (offset, page) => (offset >= PAGE ? page - PAGE : null);
exports.nextPage = (totalPage, page) => (page <= totalPage ? page + PAGE : null);
