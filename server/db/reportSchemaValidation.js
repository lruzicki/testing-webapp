const { validate } = require('jsonschema');
const schema = require('./jsonSchema');

function validateAgainstSchema(instance) {
  return validate(instance, schema);
}

module.exports = { validateAgainstSchema };
