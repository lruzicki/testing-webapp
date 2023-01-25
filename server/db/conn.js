const { MongoClient } = require('mongodb');

require('dotenv').config();

class ClientBuilder {
  constructor() {
    this.conn = this.getConnection();
    this.connectionURI = this.buildUri();
    this.databaseName = this.conn.databaseName;
  }

    getConnection = () => {
      const conn = {
        username: process.env.MONGO_USERNAME,
        passwd: process.env.MONGO_PASSOWORD,
        host: process.env.MONGO_HOST,
        port: process.env.MONGO_PORT,
        databaseName: process.env.MONGO_DATABASE,
      };

      const undefinedFields = Object.keys(conn).filter((item) => !conn[item]);
      if (undefinedFields.length > 0) {
        throw new Error(`Some of mandatory environmental variables are missing [${undefinedFields}]`);
      }

      return conn;
    }

    buildUri = () => {
      const uri = 'mongodb://'
          + `${this.conn.username}:${encodeURIComponent(this.conn.passwd)}@`
          + `${this.conn.host}:${this.conn.port}`
          + '/?maxPoolSize=20&w=majority';

      return uri;
    }
}

let db = null;
async function getDatabase() {
  if (!db) {
    const connectionDetails = new ClientBuilder();
    const client = new MongoClient(connectionDetails.connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000,
    });
    await client.connect();
    db = await client.db(connectionDetails.databaseName);
  }

  return db;
}

module.exports = {
  db: getDatabase(),
};
