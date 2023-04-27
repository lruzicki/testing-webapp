/* eslint-disable max-classes-per-file */
class TestCaseStep {
  constructor(start, finish, result, text, type) {
    this.start = start;
    this.finish = finish;
    this.result = result;
    this.text = text;
    this.type = type;
  }
}

class TestCase {
  constructor(source, gherkinDocument, steps, start, finish, name, passed) {
    this.source = source;
    this.gherkinDocument = gherkinDocument;
    this.steps = steps;
    this.start = start;
    this.finish = finish;
    this.name = name;
    this.passed = passed;
  }
}

class TestExecution {
  constructor(meta, start, finish, testCases) {
    this.meta = meta;
    this.start = start;
    this.finish = finish;
    this.testCases = testCases;
    this.saveTime = Date.now();
  }
}

module.exports = {
  TestCaseStep,
  TestCase,
  TestExecution,
};
