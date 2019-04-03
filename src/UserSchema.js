const mongoose = require('mongoose');

// A scheam we will interface with when creating documents.
const User = mongoose.model(
  'User', {
    name: {
      type: String,
      required: true
    }
  }
);

module.exports = User;
