const CompatibilitySummary = {
  type: 'object',
  properties: {
    _id: {
      type: 'object',
      properties: {
        testApp: {
          type: 'string',
        },
        testSuite: {
          type: 'string',
        },
        sourceBranch: {
          type: 'string',
        },
      },
      required: [
        'testApp',
        'testSuite',
        'sourceBranch',
      ],
    },
    compatibilities: {
      type: 'array',
      items: [
        {
          type: 'object',
          properties: {
            buildingBlock: {
              type: 'string',
            },
            timestamp: {
              type: 'integer',
            },
            saveTime: {
              type: 'integer',
            },
            testsPassed: {
              type: 'integer',
            },
            testsFailed: {
              type: 'integer',
            },
          },
          required: [
            'buildingBlock',
            'timestamp',
            'saveTime',
            'testsPassed',
            'testsFailed',
          ],
        },
      ],
    },
  },
  required: [
    '_id',
    'compatibilities',
  ],
};

const ResponseSchema = {
  type: 'array',
  items: CompatibilitySummary,
};

// eslint-disable-next-line no-unused-vars
module.exports = ResponseSchema;
