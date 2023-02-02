const MetaSchema = {
  type: 'object',
  properties: {
    protocolVersion: {
      type: 'string',
    },
    implementation: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
      },
      required: [
        'version',
        'name',
      ],
    },
    cpu: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
      },
      required: [
        'name',
      ],
    },
    os: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        version: {
          type: 'string',
        },
      },
      required: [
        'name',
        'version',
      ],
    },
    runtime: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        version: {
          type: 'string',
        },
      },
      required: [
        'name',
        'version',
      ],
    },
  },
  required: [
    'protocolVersion',
    'implementation',
    'cpu',
    'os',
    'runtime',
  ],
};

const TimeStamp = {
  type: 'object',
  properties: {
    timestamp: {
      type: 'object',
      properties: {
        seconds: {
          type: 'integer',
        },
        nanos: {
          type: 'integer',
        },
      },
      required: [
        'seconds',
        'nanos',
      ],
    },
  },
  required: [
    'timestamp',
  ],
};

const Source = {
  type: 'object',
  properties: {
    data: {
      type: 'string',
    },
    uri: {
      type: 'string',
    },
    mediaType: {
      type: 'string',
    },
  },
  required: [
    'data',
    'uri',
    'mediaType',
  ],
};

const GherkinDocument = {
  type: 'object',
  properties: {
    feature: {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          items:
            {
              type: 'object',
              properties: {
                location: {
                  type: 'object',
                  properties: {
                    line: {
                      type: 'integer',
                    },
                    column: {
                      type: 'integer',
                    },
                  },
                  required: [
                    'line',
                    'column',
                  ],
                },
                name: {
                  type: 'string',
                },
                id: {
                  type: 'string',
                },
              },
              required: [
                'location',
                'name',
                'id',
              ],
            },

        },
        location: {
          type: 'object',
          properties: {
            line: {
              type: 'integer',
            },
            column: {
              type: 'integer',
            },
          },
          required: [
            'line',
            'column',
          ],
        },
        language: {
          type: 'string',
        },
        keyword: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        children: {
          type: 'array',
          items: {
            type: 'object',
          },
        },
      },
      required: [
        'tags',
        'location',
        'language',
        'keyword',
        'name',
        'description',
      ],
    },
    comments: {
      type: 'array',
      items: {},
    },
    uri: {
      type: 'string',
    },
  },
  required: [
    'feature',
    'comments',
    'uri',
  ],
};

const Step = {
  type: 'object',
  properties: {
    start: {
      type: 'object',
      properties: {
        seconds: {
          type: 'integer',
        },
        nanos: {
          type: 'integer',
        },
      },
      required: [
        'seconds',
        'nanos',
      ],
    },
    finish: {
      type: 'object',
      properties: {
        seconds: {
          type: 'integer',
        },
        nanos: {
          type: 'integer',
        },
      },
      required: [
        'seconds',
        'nanos',
      ],
    },
    result: {
      type: 'object',
      properties: {
        duration: {
          type: 'object',
          properties: {
            seconds: {
              type: 'integer',
            },
            nanos: {
              type: 'integer',
            },
          },
          required: [
            'seconds',
            'nanos',
          ],
        },
        status: {
          type: 'string',
        },
      },
      required: [
        'duration',
        'status',
      ],
    },
    text: {
      type: 'string',
    },
    type: {
      type: 'string',
    },
  },
  required: [
    'start',
    'finish',
    'result',
    'text',
    'type',
  ],
};

const TestCase = {
  type: 'object',
  properties: {
    source: Source,
    gherkinDocument: GherkinDocument,
    steps: {
      type: 'array',
      items: Step,
    },
    start: TimeStamp,
    finish: TimeStamp,
    name: {
      type: 'string',
    },
  },
  required: [
    'source',
    'gherkinDocument',
    'steps',
    'start',
    'finish',
    'name',
  ],
};

const TestReport = {
  type: 'object',
  properties: {
    meta: MetaSchema,
    start: TimeStamp,
    finish: TimeStamp,
    testCases: {
      type: 'array',
      items: TestCase,
    },
    buildingBlock: {
      type: 'string',
    },
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
    'meta',
    'start',
    'finish',
    'testCases',
    'buildingBlock',
    'testApp',
    'testSuite',
    'sourceBranch',
  ],
};

module.exports = TestReport;
