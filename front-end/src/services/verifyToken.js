const jwt = require('jsonwebtoken');
// require('dotenv/config');

const secret = process.env.SECRET || 'my_secret';

export default function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (err) {
    console.log(err);
  }
}
