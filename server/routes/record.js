const express = require('express');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const reportRoutes = express.Router();
const ReportUploadRequestHandler = require('../reportSave/handleSaveRequest');

// This section will help you get a list of all the reports.
reportRoutes.route('/report').get((req, res) => {
  const dbConnect = req.app.locals.reportCollection;
  dbConnect
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// This section will help you get a single report by id
reportRoutes.route('/report/:id').get((req, res) => {
  const dbConnect = req.app.locals.reportCollection;
  const myquery = { _id: ObjectId(req.params.id) };
  dbConnect
    .findOne(myquery, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

reportRoutes.route('/report/upload').post(upload.single('report'), (req, res) => {
  if (!req.file) {
    res.status(400).send('Invalid form, file not provided.');
    return;
  }
  new ReportUploadRequestHandler(req, res).saveData().catch((err) => res.status(500).send(`Unexpected exception ocurred: ${err}`));
});

module.exports = reportRoutes;
