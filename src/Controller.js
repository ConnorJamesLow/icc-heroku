const db = require('./Database');
const Security = require('./Security');

const security = new Security();

// define a class to handle our requests
class Controller {
  handleListen(port) {

    // When you see this in your console, it means your app is ready to accept requests!
    const message = `App started listening on port ${port}`;
    console.log(message);

    // add the log to our database
    db.saveLog(message);
  }

  getLogs(req, res) {

    // If the query fails, return the error to the client.
    // N.B. You should never return technology specific error messages to a client in a product environment (i.e., the err variable).
    const handleFail = (err) => {
      res.send({
        message: 'Fatal error',
        status: -1,
        data: false,
        err // don't do this in real life.
      });
    }

    // If the query succeeds, return the results to the client.
    const handleSuccess = (data) => {
      res.send({
        message: 'OK',
        status: 0,
        data
      });
    }

    // Pass our handlers to the database method where the query will happen.
    db.getLogs(handleSuccess, handleFail);
  }

  loggingMiddleware(req, res, next) {
    console.log('Hello from Express!');

    // message containing the http request method and ip origin.
    const message = `${req.method} request from origin ${req.ip}.`;

    // creates a new log model.
    db.saveLog(message);

    next();
  }

  authenticate(req, res) {
    const { credentials } = req.query;
    console.log('credentials received:', credentials);

    const handleFail = (err) => {
      res.send({
        message: 'Invalid credentials',
        status: -1,
        data: false,
        err // don't do this in real life.
      });
    }

    // If the query succeeds, return the token to the client. They need it for authorization.
    const handleSuccess = (data) => {
      if (data.length > 0) {

        // Results found! Create a token in the database.
        const token = security.getToken(data);

        // send the encoded token back to the client.
        res.send({
          message: 'OK',
          status: 0,
          data: token
        });
      } else {

        // If no results are found (i.e. length == 0), then the user must not be in the database.
        res.send({
          message: 'No user',
          status: 0,
          data: false
        });
      }
    }

    db.getUser(credentials, handleSuccess, handleFail);
  }
}

module.exports = Controller;