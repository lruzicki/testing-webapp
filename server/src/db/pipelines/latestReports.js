const getLatestReportPipeline = () => [{
  $match: {
    'finish.timestamp.seconds': {
      $exists: 1,
    },
    buildingBlock: {
      $exists: 1,
    },
    testSuite: {
      $exists: 1,
    },
    testApp: {
      $exists: 1,
    },
    sourceBranch: {
      $exists: 1,
    },
    saveTime: {
      $exists: 1,
    },
  },
},
{
  $group: {
    _id: {
      buildingBlock: '$buildingBlock',
      testSuite: '$testSuite',
      testApp: '$testApp',
      sourceBranch: '$sourceBranch',
    },
    latest: {
      $last: {
        date: '$finish.timestamp.seconds',
        saveTime: '$saveTime',
        id: '$_id',
        testCases: '$testCases',
      },
    },
  },
},
{
  $group: {
    _id: {
      testApp: '$_id.testApp',
      testSuite: '$_id.testSuite',
      sourceBranch: '$_id.sourceBranch',
    },
    compatibilities: {
      $push: {
        id: '$latest.id',
        buildingBlock: '$_id.buildingBlock',
        timestamp: '$latest.date',
        saveTime: '$latest.saveTime',
        testsPassed: {
          $size: {
            $filter: {
              input: '$latest.testCases',
              as: 'case',
              cond: {
                $eq: ['$$case.passed', true],
              },
            },
          },
        },
        testsFailed: {
          $size: {
            $filter: {
              input: '$latest.testCases',
              as: 'case',
              cond: {
                $eq: ['$$case.passed', false],
              },
            },
          },
        },
        compatibility: {
          $let: {
            vars: {
              sumPassed: {
                $size: {
                  $filter: {
                    input: '$latest.testCases',
                    as: 'case',
                    cond: {
                      $eq: ['$$case.passed', true],
                    },
                  },
                },
              },
              sumFailed: {
                $size: {
                  $filter: {
                    input: '$latest.testCases',
                    as: 'case',
                    cond: {
                      $eq: ['$$case.passed', false],
                    },
                  },
                },
              },
            },
            in: {
              $round: [{
                $divide: [
                  '$$sumPassed',
                  {
                    $cond: {
                      if: {
                        $gt: [{
                          $add: ['$$sumPassed', '$$sumFailed'],
                        }, 0],
                      },
                      then: {
                        $add: ['$$sumPassed', '$$sumFailed'],
                      },
                      else: 1,
                    },
                  },
                ],
              },
              4,
              ],
            },
          },
        },
      },
    },
  },
},
{
  $set: {
    overallCompatibility: {
      $let: {
        vars: {
          sumPassed: {
            $sum: '$compatibilities.testsPassed',
          },
          sumFailed: {
            $sum: '$compatibilities.testsFailed',
          },
        },
        in: {
          $round: [{
            $divide: [
              '$$sumPassed',
              {
                $cond: {
                  if: {
                    $gt: [{
                      $add: ['$$sumPassed', '$$sumFailed'],
                    }, 0],
                  },
                  then: {
                    $add: ['$$sumPassed', '$$sumFailed'],
                  },
                  else: 1,
                },
              },
            ],
          },
          4,
          ],
        },
      },
    },
  },
},
{
  $sort: {
    _id: 1,
  },
},
];

const sortLatestReports = (sorting) => [
  {
    $sort: { ...sorting },
  },
];

module.exports = {
  getLatestReportPipeline,
  sortLatestReports,
};
