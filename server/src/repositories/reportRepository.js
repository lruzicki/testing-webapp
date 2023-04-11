const reportRepository = (repository) => {
  const add = (report, callback) => repository.add(report, callback);
  function aggregateCompatibilityByProduct(filters, callback) {
    return repository.aggregateCompatibilityByProduct(filters, callback);
  }

  function productsCount(callback) {
    return repository.productsCount(callback);
  }

  function aggregateBBDetailsByProductId(id, sorting, callback) {
    return repository.aggregateBBDetailsByProductId(id, sorting, callback);
  }

  return {
    add,
    aggregateCompatibilityByProduct,
    aggregateBBDetailsByProductId,
    productsCount,
  };
};

module.exports = reportRepository;
