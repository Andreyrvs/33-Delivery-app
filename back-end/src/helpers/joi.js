const joi = require('joi');
const { handleThrowError } = require('./errorHandler');

const email = joi.string().email().required().messages({
  'string.base': 'Email must be an string',
  'string.email': 'Email must be a valid email',
});

const role = joi.string()
.valid('administrator', 'seller', 'customer')
.required()
.messages({ 'any.only': 'Role can be only administrator, seller or customer' });

const password = joi.string().min(6).required().messages({
  'string.base': 'Password must be an string',
  'string.min': 'Password must be at least 6 characters',
});
const name = joi.string().max(12).required().messages({
  'string.base': 'Name must be an string',
  'string.max': 'Name must be less than 12 characters',
});

const UserJoiSchema = joi.object({
  name, email, password, role,
}).messages({ 'any.required': 'All fields are required' });

const UserLoginSchema = joi.object({
  email, password,
}).messages({ 'any.required': 'All fields are required' });

function joiHandler(value, statusCode, joiSchema) {
  const { error } = joiSchema.validate(value);
  if (error) handleThrowError(error.message, statusCode);
}

const validateUserJoi = (value, statusCode) => joiHandler(value, statusCode, UserJoiSchema);
const validateEmailJoi = (value, statusCode) => joiHandler(value, statusCode, email);
const validateLoginJoi = (value, statusCode) => joiHandler(value, statusCode, UserLoginSchema);

module.exports = {
  validateUserJoi,
  validateEmailJoi,
  validateLoginJoi,
};