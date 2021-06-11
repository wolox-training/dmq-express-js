exports.countPerPage = (count, limit) =>
  count % Number(limit) === 0 ? Math.trunc(count / Number(limit)) : Math.trunc(count / Number(limit)) + 1;
