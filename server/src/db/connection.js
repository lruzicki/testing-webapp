const mongoose = require('mongoose');

/* eslint-disable no-console */
module.exports = {
  connection: (config) => {
    function connectToMongo() {
      mongoose
        .connect(config.mongoConnection.uri)
        .then(
          () => {},
          (err) => {
            console.info('Connection error: error', err);
          },
        )
        .catch((err) => {
          console.log('ERROR:', err);
        });
    }

    mongoose.connection.on('disconnected', () => {
      console.error('Mongo disconnected, reconnecting...');
      setTimeout(() => connectToMongo(), config.mongoConnection.reconnectInterval);
    });

    return {
      connectToMongo,
    };
  },
};
