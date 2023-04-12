/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const mapQueryToSorting = (queryParams) => {
  const sortIndicator = 'sort.';
  const mapQueryToMongo = {
    'sort.name': 'endpoint',
    'sort.method': 'method',
    'sort.status': 'passed',
    'sort.uri': 'uri',
  };
  const newParams = {};
  Object.keys(queryParams).forEach((key) => {
    const order = queryParams[key];
    if (key.startsWith(sortIndicator)) {
      const mappedParameter = mapQueryToMongo[key];
      if (!mappedParameter) {
        throw new Error(`Unsupported sorting key, supported keys are ${Object.keys(mapQueryToMongo)}`);
      }
      if (order !== 'desc' && order !== 'asc') {
        throw new Error(`Unsupported sort value for ${key}, supported values are 'desc' and 'asc'`);
      }
      newParams[mappedParameter] = order === 'desc' ? -1 : 1;
    }
  });
  return newParams;
};

module.exports = class ReportGetProductDetailsRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getProductDetails(repository) {
    const { limit, offset } = this.req.query;
    const { id } = this.req.params;
    const sorting = mapQueryToSorting(this.req.query);

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
