const jwt = require('jsonwebtoken');
const { handleThrowError } = require('../helpers');

class Auth {
  static jwtToken(req, _res, next) {
    if (!req.headers.authorization) handleThrowError('Token not found', 401);

    try {
      const data = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
      req.body.user = data;
      next();
    } catch (error) {
      console.log('JWT Auth ===>', error);
      handleThrowError('Expired or invalid token', 401);
    }
  }
}

module.exports = Auth;