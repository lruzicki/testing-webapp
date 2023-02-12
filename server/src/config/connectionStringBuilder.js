module.exports = class MongoConnection {
  constructor() {
    this.conn = this.getConnection();
    this.uri = this.buildUri();
    this.databaseName = this.conn.databaseName;
    this.reconnectInterval = 10000;
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
};
