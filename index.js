const express = require('express');

// create the Express application
const app = express();

// dynamically assign the port, but include a fallback
const port = process.env.PORT || 3000;

// setup Express to deliver static content
app.use(express.static('public'));

// listen for connections
app.listen(port, () => {

  // When you see this in your console, it means your app is ready to accept requests!
  console.log(`App started listening on port ${port}`);
});