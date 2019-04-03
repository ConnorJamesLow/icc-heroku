const express = require('express');
const database = require('./src/Database');
const Controller = require('./src/Controller');
const SecurityMiddleware = require('./src/SecurityMiddleware');

const controller = new Controller();
const middleware = new SecurityMiddleware();

// configure connection
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/icc';

// dynamically assign the port, but include a fallback
const port = process.env.PORT || 3000;

// create the Express application
const app = express();

// initialize mongo connection
database.getDbConnection(url);

// setup Express to deliver static content
app.use(express.static('public'));

// listen for connections
app.listen(port, () => controller.handleListen(port));

// Custom logging middleware
app.all('/api/*', controller.loggingMiddleware);

// A route to retrieve the token using credentials.
app.get('/api/login', controller.authenticate);

// Security Middleware for authentication
app.all('/api/*', middleware.authorize);

// A GET route that returns some log data fetched from our mongodb.
app.get('/api/log', controller.getLogs);
