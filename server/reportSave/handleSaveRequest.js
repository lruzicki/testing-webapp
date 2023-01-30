/* eslint-disable no-console */
const streamline = require('streamifier');
const readline = require('readline');
const { validate } = require('jsonschema');
const { validateAgainstSchema } = require('../db/reportSchemaValidation');
const TestCaseBuilder = require('./utils/testCaseBuilder');

const RequestSchema = {
  type: 'object',
  properties: {
    file: { type: 'Object' },
    body: {
      type: 'Object',
      properties: {
        buildingBlock: { type: 'string' },
        testSuite: { type: 'string' },
        testApp: { type: 'string' },
        sourceBranch: { type: 'string' },
      },
      required: [
        'buildingBlock',
        'testSuite',
        'testApp',
        'sourceBranch',
      ],
    },
  },
  required: [
    'file',
    'body',
  ],
};

module.exports = class ReportUploadRequestHandler {
  constructor(saveRequest, response) {
    this.req = saveRequest;
    this.res = response;
    this.db_connect = saveRequest.app.locals.reportCollection;
  }

  async saveData() {
    if (!this.isRequestValid()) {
      return false;
    }
    const dataToSave = new TestCaseBuilder(await this.loadData()).buildExecutionResult();
    await this.jsonSave(dataToSave);
    return true;
  }

  isRequestValid() {
    const validationResult = validate(this.req, RequestSchema);
    if (validationResult.errors.length > 0) {
      this.sendValidationError(validationResult.errors);
      return false;
    }
    return true;
  }

  async loadData() {
    const rl = readline.createInterface({
      input: streamline.createReadStream(this.req.file.buffer),
      crlfDelay: Infinity,
    });

    const items = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of rl) {
      try {
        const searchTerm = '{';
        const indexOfFirst = line.indexOf(searchTerm);
        // Message format sometimes have artefacts at start of line
        const fixedLine = line.substring(indexOfFirst);
        items.push(JSON.parse(fixedLine));
      } catch (e) {
        console.error(e);
      }
    }

    return items;
  }

  async jsonSave(data) {
    const report = data;
    report.buildingBlock = this.req.body.buildingBlock;
    report.testSuite = this.req.body.testSuite;
    report.testApp = this.req.body.testApp;
    report.sourceBranch = this.req.body.sourceBranch;

    try {
      const validationResult = validateAgainstSchema(report);
      if (validationResult.errors.length > 0) {
        this.sendValidationError(validationResult.errors);
        return;
      }
      this.saveToDatabase(report);
    } catch (err) { this.res.status(500).send(`Error inserting report: ${err}`); }
  }

  saveToDatabase(data) {
    const { res } = this;
    this.db_connect.insertOne(data, (err, result) => {
      if (err) {
        res.status(400).send(`Error inserting report: ${err}`);
      } else {
        console.log(`Added a new report with id ${result.insertedId}`);
        res.status(201).send({ success: true });
      }
    });
  }

  sendValidationError(errors) {
    this.res.status(400).send({
      success: false,
      details: `Invalid report format. Details on report parsing:\n${errors}\n`,
    });
  }
};
