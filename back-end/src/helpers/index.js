const generateToken = require('./generateToken');
const { CustomError, handleThrowError } = require('./errorHandler');

module.exports = {
  generateToken,
  CustomError,
  handleThrowError,
};