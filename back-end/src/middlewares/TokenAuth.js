const jwt = require('jsonwebtoken');
const { handleThrowError, httpStatusCode } = require('../helpers');

class Auth {
  static jwtToken(req, _res, next) {
    if (!req.headers.authorization) {
      handleThrowError('Token not found', httpStatusCode.UNAUTHORIZED);
    }

    try {
      const data = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      req.body.user = data;
      next();
    } catch (error) {
      console.log('JWT Auth ===>', error);
      handleThrowError('Expired or invalid token', httpStatusCode.UNAUTHORIZED);
    }
  }
}

module.exports = Auth;