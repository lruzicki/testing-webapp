/* eslint-disable no-underscore-dangle */
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
        this.res.status(500).send(`Failed to fetch detailed report summary. Details: \n\t${err}`);
        return;
      }

      const aggregatedResult = result[0];

      /*  reduce to one item per endpoint, where we always prefer
      the ones that didn't pass over the ones that did  */
      const aggregatedData = aggregatedResult.data.reduce((items, item) => {
        const lastItemIndex = items.length - 1;
        const lastItem = lastItemIndex < 0 ? null : items[lastItemIndex];

        if (lastItem === null || item.uri !== lastItem.uri) {
          // add new item
          items.push(item);
        } else if (!item.passed) {
          // replace with the failed item
          items[lastItemIndex] = item;
        }

        return items;
      }, []);

      const paginatedAggregatedData = offset !== undefined
        ? aggregatedData.slice(offset, limit + offset) : aggregatedData.slice(0, limit);

      // build response object
      const finalResult = {};
      Object.assign(finalResult, {
        compatibilities: aggregatedResult.compatibilities,
        data: paginatedAggregatedData,
        count: aggregatedData.length,
      });

      this.res.json(finalResult);
    });
  }
};
