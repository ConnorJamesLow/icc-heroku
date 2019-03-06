const express = require('express');
const mongoose = require('mongoose');

// create the Express application
const app = express();

// configure connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/icc';

// some options to avoid deprecated settings
const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

// connect to the mongo database
mongoose.connect(url, mongooseOptions);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

// A scheam we will interface with when creating documents.
const Log = mongoose.model(
  'Log', {
    date: {
      type: Date,
      default: Date.now
    },
    message: String
  }
);

// dynamically assign the port, but include a fallback
const port = process.env.PORT || 3000;

// setup Express to deliver static content
app.use(express.static('public'));

// listen for connections
app.listen(port, () => {

  // When you see this in your console, it means your app is ready to accept requests!
  const message = `App started listening on port ${port}`;
  console.log(message);

  // add the log to our database
  const log = new Log({ message });
  log.save((err, result) => {
    if (err) {
      console.warn('Well, that didn\'t work.');
      console.error('execption', err);
    } else {
      console.log('Successfully added the log!', result);
    }
  });
});

// A GET route that returns some log data fetched from our mongodb.
app.get('/api/log', (req, res) => {

  // Query the Log collection in our mongodb using the Mongoose library.
  Log.find({}, (err, documents) => {
    if (err) {
      console.warn('Something happened and the query failed :( ');
      console.error('execption', err);

      // return the error to the client.
      res.send({
        message: 'Fatal error',
        status: -1,
        data: false,
        err
      });
    } else {
      console.log('Search successful!');

      // return the query result to the client.
      res.send({
        message: 'OK',
        status: 0,
        data: documents
      });
    }
  });
});
