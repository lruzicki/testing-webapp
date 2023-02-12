const { MongoClient } = require('mongodb');

const { appConfig } = require('../config/connectionStringBuilder');

let db = null;
async function getDatabase() {
  if (!db) {
    const connectionDetails = appConfig;
    const client = new MongoClient(connectionDetails.connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    db = await client.db(connectionDetails.databaseName);
  }

  return db;
}

module.exports = {
  db: getDatabase(),
};
