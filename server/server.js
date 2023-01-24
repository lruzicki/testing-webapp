const express = require('express')
const cors = require('cors')
const { apiKeyAuth } = require('@vpriem/express-api-key-auth')
const { db } = require('./db/conn')

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use('/report/upload', apiKeyAuth(/^API_KEY_/)) // Matching all process.env.API_KEY_*

app.use(express.json())
//app.use(require('./routes/record'))

db.then(db =>{
  try {
    const reportCollection = db.collection('testexecutions')
    app.locals.reportCollection = reportCollection
    console.log('Database connected', db.databaseName)
  }
  catch (error) {
    console.err(error)
    throw Error(error)
  }

}).catch(err => console.error('Database connection failed, reason:\n', err))

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
