import {
  BuildingBlockEndpointTest,
  BuildingBlockTestSummary,
  BuildingBlockType,
  ProductsType,
} from '../../../../service/types';

export const mockedProduct: ProductsType = {
  _id: {
    testApp: 'Test Product',
    testSuite: 'Test suite',
    sourceBranch: 'Test branch',
  },
  compatibilities: [
    {
      id: '234bj3bj4b23jr',
      buildingBlock: 'bb-messaging',
      timestamp: 1674924957,
      saveTime: 1676213907348,
      testsPassed: 30,
      testsFailed: 2,
      compatibility: 0.3455,
    },
  ],
  overallCompatibility: 0.2355,
};

export const buildingBlock: BuildingBlockType = {
  id: '07112c0a-8263-4717-92ce-c52bca785624',
  buildingBlock: 'bb-payments',
  timestamp: 1,
  saveTime: 1659380963000,
  testsPassed: 2,
  testsFailed: 2,
  compatibility: 0.3455,
};

export const endpointTestResult: BuildingBlockEndpointTest = {
  endpoint: '/data/{someparameter}/method',
  method: 'GET',
  passed: true,
  uri: 'features/some_endpoint.feature',
};

export const buildingBlockTestSummary: BuildingBlockTestSummary = {
  compatibilities: buildingBlock,
  data: [endpointTestResult],
  count: 1,
};
