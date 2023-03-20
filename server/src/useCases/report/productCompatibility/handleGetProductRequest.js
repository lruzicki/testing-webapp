/* eslint-disable no-console */

module.exports = class ReportGetProductRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getReports(repository) {
    const { limit, offset } = this.req.query;

    repository.aggregateCompatibilityByProduct({ limit, offset }, async (err, result) => {
      if (err) {
        console.error(err);
        this.res.status(500).send(`Failed to fetch report summary. Details: \n\t${err}`);
        return;
      }
      this.res.json(result);
    });
  }
};
