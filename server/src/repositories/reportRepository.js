const reportRepository = (repository) => {
  const add = (report, callback) => repository.add(report, callback);
  function aggregateByProduct(filters, callback) {
    return repository.aggregateByProduct(filters, callback);
  }

  return {
    add,
    aggregateByProduct,
  };
};

module.exports = reportRepository;
