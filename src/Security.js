// grab our dependency
const jwt = require('jsonwebtoken');

// ideally, this should go in a separate file, probably json.
const secret = 'This is a secret that we will use to sign our jwt';
const options = {
  expiresIn: 60
};

class Security {
  /**
   * Create a token using the requester's provided credentials.
   *
   * @param {*} credentials Belonging to the user.
   * @returns A JWT.
   */
  getToken(credentials) {
    const token = jwt.sign({ credentials }, secret, options);
    return token;
  }

  /**
   * Verify the JWT provided is signed by our application. 
   *
   * @param {*} token A JWT from the client.
   * @returns The credentials on success. Else, returns null.
   */
  verifyToken(token) {
    try {
      const credentials = jwt.verify(token, secret, options);
      return credentials;
    } catch (err) {
      return null;
    }
  }
}

module.exports = Security;