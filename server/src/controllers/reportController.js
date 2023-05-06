const ReportUploadRequestHandler = require('../useCases/report/reportSave/handleSaveRequest');
const ReportProductGetRequestHandler = require('../useCases/report/productCompatibility/handleGetProductRequest');
const ProductCountRequestHandler = require('../useCases/report/productCount/handleGetProductCountRequest');
const ProductDetailsRequestHandler = require('../useCases/report/productTestCases/handleGetProductDetailsRequest');
const { default500Error } = require('./controllerUtils');

const reportController = (reportDbRepository, reportDbRepositoryImpl) => {
  const repository = reportDbRepository(reportDbRepositoryImpl);

  const saveReport = (req, res) => {
    if (!req.files) {
      res.status(400).send('Invalid form, file not provided.');
      return;
    }

    new ReportUploadRequestHandler(req, res)
      .saveData(repository)
      .catch((err) => default500Error(res, err));
  };

  const getProductCompatibility = (req, res) => {
    new ReportProductGetRequestHandler(req, res)
      .getReports(repository)
      .catch((err) => default500Error(res, err));
  };

  const getProductsCount = (req, res) => {
    new ProductCountRequestHandler(req, res)
      .getProductsCount(repository)
      .catch((err) => default500Error(res, err));
  };

  const getProductDetails = (req, res) => {
    new ProductDetailsRequestHandler(req, res)
      .getProductDetails(repository)
      .catch((err) => default500Error(res, err));
  };

  return {
    saveReport,
    getProductCompatibility,
    getProductsCount,
    getProductDetails,
  };
};

module.exports = reportController;
