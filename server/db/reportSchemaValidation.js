const { validate } = require('jsonschema');
const schema = require('../schemas/testReportSchema');

function validateAgainstSchema(instance) {
  return validate(instance, schema);
}

module.exports = { validateAgainstSchema };
