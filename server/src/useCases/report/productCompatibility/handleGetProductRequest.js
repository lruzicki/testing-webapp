/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

module.exports = class ReportGetProductRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getReports(repository) {
    repository.aggregateByProduct({}, (err, result) => {
      if (err) {
        console.error(err);
        this.res.status(500).send(`Failed to fetch report summary. Details: \n\t${err}\nPlease contact administrator.`);
        return;
      }
      this.res.json(result);
    });
  }
};
