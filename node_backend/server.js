const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()
const app = express();

// Express configuration
app.set('port', process.env.PORT || 3000)

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// use cors options
app.use(cors())


// mongo db database connection
const db = require("./src/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// routes
const secret = require('./src/routes/secret')
app.use('/api/secret', secret)

// catch all errors
const errorHandler = require("./src/middleware/errorhandler");
app.use(errorHandler)


module.exports = app