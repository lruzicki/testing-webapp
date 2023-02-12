// /* eslint-disable no-console */
// const express = require('express');
// const cors = require('cors');
// const { apiKeyAuth } = require('@vpriem/express-api-key-auth');
// const { connection } = require('./db/connection');
// const config = require('./config');

// const port = process.env.PORT || 5000;
// const app = express();

// console.log("CONFIG: ", config);
// connection(config.appConfig).connectToMongo();
// app.use(cors());
// app.use('/report/upload', apiKeyAuth(/^API_KEY_/)); // Matching all process.env.API_KEY_*

// app.use(express.json());
// app.use(require('../src/routes/record'));

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
