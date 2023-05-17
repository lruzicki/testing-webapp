const default500Error = (responseObject, errorList) => responseObject.status(500).send(`Unexpected exception occurred:\n${errorList}`);

module.exports = {
  default500Error,
};
