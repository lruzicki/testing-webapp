const express = require('express');
const multer = require('multer');

const buildReportRoutes = (reportController) => {
  const reportRoutes = express.Router();

  const storage = multer.memoryStorage();
  const upload = multer({ storage });
  reportRoutes.route('/report/upload').post(upload.single('report'), reportController.saveReport);
  reportRoutes.route('/report').get(reportController.getProductCompatibility);
  return reportRoutes;
};

module.exports = buildReportRoutes;
