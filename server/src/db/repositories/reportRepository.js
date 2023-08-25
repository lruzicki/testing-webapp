const ReportModel = require('../schemas/report');

const { getReportDetailsPipeline, sortReportDetails } = require('../pipelines/reportDetails');
const { getLatestReportPipeline, sortLatestReports, branchReports } = require('../pipelines/latestReports');

function addSortingToPipeline(sorting, aggregation, sortFunction) {
  const sort = !!sorting && Object.keys(sorting).length !== 0;
  const sortedAggregation = sort ? aggregation.concat(sortFunction(sorting)) : aggregation;
  return sortedAggregation;
}

const repository = () => {
  const add = (report, callback) => {
    const newReport = new ReportModel(report);
    return newReport.save(callback);
  };

  const aggregateCompatibilityByProduct = (filters, sorting, callback) => {
    let aggregation = [];
    if (filters.branch !== undefined) {
      aggregation = aggregation.concat(branchReports(filters.branch));
    }
    aggregation = aggregation.concat(getLatestReportPipeline());
    aggregation = addSortingToPipeline(sorting, aggregation, sortLatestReports);
    aggregation = ReportModel.aggregate(aggregation);

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
    const sortedAggregation = addSortingToPipeline(sorting, aggregation, sortReportDetails);
    ReportModel.aggregate(sortedAggregation).exec(callback);
  };

  const productsCount = (filters, callback) => {
    let aggregation = [];
    if (filters.branch !== undefined) {
      aggregation = aggregation.concat(branchReports(filters.branch));
    }
    aggregation = aggregation.concat(getLatestReportPipeline());
    ReportModel.aggregate(aggregation)
      .append([{ $count: 'count' }])
      .exec(callback);
  };

  const aggregateByBuildingBlock = (callback) => {
    const aggregation = ReportModel.aggregate([]);
    aggregation.group({
      _id: '$buildingBlock',
      softwares: { $addToSet: '$testApp' },
    });
    aggregation.project({
      _id: 1,
      supportedSoftwares: { $size: '$softwares' },
    });
    aggregation.sort({ _id: 1 }).exec(callback);
  };

  return {
    add,
    aggregateCompatibilityByProduct,
    aggregateBBDetailsByProductId,
    productsCount,
    aggregateByBuildingBlock,
  };
};

module.exports = repository();
