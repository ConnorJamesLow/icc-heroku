const mongoose = require('mongoose');
const Log = require('./LogSchema'); // Get our mongoose and model dependency from our LogSchema file.
const User = require('./UserSchema');

module.exports = {
  getDbConnection(url) {

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
    return db;
  },

  saveLog(message, onSuccess = null, onFail = null) {

    // add the log to our database
    const log = new Log({ message });
    log.save((err, result) => {
      if (err) {
        console.warn('Well, that didn\'t work.');
        console.error('execption', err);
        if (onFail) {
          onSuccess(result)
        }
      } else {
        console.log('Successfully added the log!', result);
        if (onSuccess) {
          onSuccess(result)
        }
      }
    });
  },

  getLogs(onSuccess, onFail) {

    // Query the Log collection in our mongodb using the Mongoose library.
    Log.find({}, (err, documents) => {
      if (err) {
        console.warn('Something happened and the query failed :( ');
        console.error('execption', err);

        // handle with failure callback
        onFail(err);
      } else {
        console.log('Search successful!');

        // handle with success callback
        onSuccess(documents);
      }
    });
  },

  getUser(name, onSuccess, onFail) {
    User.find({ name }, (err, documents) => {
      if (err) {
        console.warn('Something happened and the query failed :( ');
        console.error('execption', err);

        // handle with failure callback
        onFail(err);
      } else {
        console.log('Search successful!');

        // handle with success callback
        onSuccess(documents);
      }
    })
  }
};