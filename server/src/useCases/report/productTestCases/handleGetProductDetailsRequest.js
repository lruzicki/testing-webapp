/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { mapQueryToSorting } = require('../requestUtils');

module.exports = class ReportGetProductDetailsRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getProductDetails(repository) {
    const { limit, offset } = this.req.query;
    const { id } = this.req.params;

    const mapQueryToMongo = {
      'sort.name': 'endpoint',
      'sort.method': 'method',
      'sort.status': 'passed',
      'sort.uri': 'uri',
    };
    const sorting = mapQueryToSorting(this.req.query, mapQueryToMongo);

    repository.aggregateBBDetailsByProductId({ id }, sorting, async (err, result) => {
      if (err) {
        console.error(err);
        this.res.status(500).send(`Failed to fetch detailed report summary. Details: \n\t${err}`);
        return;
      }

      const aggregatedResult = result[0];

      const paginatedAggregatedData = offset !== undefined
        ? aggregatedResult.data.slice(offset, limit + offset)
        : aggregatedResult.data.slice(0, limit);

      // build response object
      const finalResult = {};
      Object.assign(finalResult, {
        compatibilities: aggregatedResult.compatibilities,
        data: paginatedAggregatedData,
        count: aggregatedResult.data.length,
      });

      this.res.json(finalResult);
    });
  }
};
