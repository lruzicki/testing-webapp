/* eslint-disable import/prefer-default-export */
require('dotenv').config();

const MongoConnection = require('./connectionStringBuilder');

const appConfig = {
  appName: process.env.appName ? process.env.appName : 'testing-webapp-api',
  isProduction: process.env.envName ? process.env.envName === 'prod' : false,
  mongoConnection: new MongoConnection(),
};

module.exports = {
  appConfig,
};
