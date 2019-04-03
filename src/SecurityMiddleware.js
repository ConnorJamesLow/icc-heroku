const Security = require('./Security');

const security = new Security();

// define our class.
class SecurityMiddleware {
  authorize(req, res, next) {
    const { token } = req.query;
    if (security.verifyToken(token)) {
      next();
    } else {
      res.send({
        message: 'Invalid token',
        status: -1,
        data: false
      });
    }
  }
}

// export it for usage in other files.
module.exports = SecurityMiddleware;