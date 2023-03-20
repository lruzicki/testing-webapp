/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

module.exports = class ReportGetProductDetailsRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getProductDetails(repository) {
    const { limit, offset } = this.req.query;
    const { id } = this.req.params;

    repository.aggregateBBDetailsByProductId({ id }, async (err, result) => {
      if (err) {
        console.error(err);
        this.res
          .status(500)
          .send(`Failed to fetch detailed report summary. Details: \n\t${err}`);
        return;
      }

      const aggregatedResult = result[0];

      let tempItem = {};
      // reduce received data to one per endpoint - database returns one per scenario
      aggregatedResult.data = aggregatedResult.data.reduce((items, item) => {
        const { uri, passed } = item;

        if (tempItem.uri !== uri) {
          items.push(item);
        } else if (tempItem.passed !== passed && !passed) {
          items.find((i) => i.uri === uri).passed = passed;
        }

        tempItem = item;
        return items;
      }, []);

      aggregatedResult.data.forEach((item) => {
        const { method, endpoint } = item;
        // slice by @method= length
        item.method = method.length > 0 ? method[0].slice(8) : '';
        // slice by @endpoint= length
        item.endpoint = endpoint.length > 0 ? endpoint[0].slice(10) : '';
      });

      Object.assign(aggregatedResult, { count: aggregatedResult.data.length });

      aggregatedResult.data = offset !== undefined
        ? aggregatedResult.data.slice(offset, limit + offset)
        : aggregatedResult.data.slice(0, limit);

      this.res.json(aggregatedResult);
    });
  }
};
