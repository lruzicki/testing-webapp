const ReportModel = require('../schemas/report');

const { getReportDetailsPipeline, sortReportPipeline } = require('../pipelines/reportDetails');
const { getLatestReportPipeline } = require('../pipelines/latestReports');

const repository = () => {
  const add = (report, callback) => {
    const newReport = new ReportModel(report);
    return newReport.save(callback);
  };

  const aggregateCompatibilityByProduct = (filters, callback) => {
    const aggregation = ReportModel.aggregate(getLatestReportPipeline());

    if (filters.offset !== undefined) {
      aggregation.append({ $skip: filters.offset });
    }

    if (filters.limit !== undefined) {
      aggregation.append({ $limit: filters.limit });
    }

    aggregation.exec(callback);
  };

  const aggregateBBDetailsByProductId = (productId, sorting, callback) => {
    const aggregation = getReportDetailsPipeline(productId.id);
    const sort = !!sorting && Object.keys(sorting).length !== 0;
    const sortedAggregation = sort ? aggregation.concat(sortReportPipeline(sorting)) : aggregation;
    ReportModel.aggregate(sortedAggregation).exec(callback);
  };

  const productsCount = (callback) => {
    ReportModel.aggregate(getLatestReportPipeline())
      .append([{ $count: 'count' }])
      .exec(callback);
  };

  return {
    add,
    aggregateCompatibilityByProduct,
    aggregateBBDetailsByProductId,
    productsCount,
  };
};

module.exports = repository();
