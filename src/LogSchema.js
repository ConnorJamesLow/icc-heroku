const mongoose = require('mongoose');

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

module.exports = Log;
