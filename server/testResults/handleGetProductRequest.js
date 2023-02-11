/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */

module.exports = class ReportGetProductRequestHandler {
  constructor(request, response) {
    this.req = request;
    this.res = response;
    this.dbConnect = request.app.locals.reportCollection;
  }

  async getReports() {
    try {
      this.dbConnect
        .aggregate(this.latestReports())
        .toArray((err, result) => {
          if (err) {
            console.error(err);
            this.res.status(500).send(`Failed to fetch report summary. Details: \n\t${err}\nPlease contact administrator.`);
            return;
          }
          this.res.json(result);
        });
    } catch (err) {
      this.res.status(500).send(err);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  latestReports() {
    return [
      {
        $match: {
          'finish.timestamp.seconds': { $exists: 1 },
          buildingBlock: { $exists: 1 },
          testSuite: { $exists: 1 },
          testApp: { $exists: 1 },
          sourceBranch: { $exists: 1 },
          saveTime: { $exists: 1 },
        },
      }, {
        $group: {
          _id: {
            buildingBlock: '$buildingBlock',
            testSuite: '$testSuite',
            testApp: '$testApp',
            sourceBranch: '$sourceBranch',
          },
          latest: {
            $last: {
              date: '$finish.timestamp.seconds', saveTime: '$saveTime', id: '$_id', testCases: '$testCases',
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
            },
          },
        },
      },
      { $sort: { _id: 1 } },
    ];
  }
};
