const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : ''; //confirmed password

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (!Validator.isLength(data.password, { min: 4, max: 30 })) {
    errors.password = 'Password must be at least 4 characters';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Password must match';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Passwords field is required';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field';
  }

  // if everything passes errors object will be empty and in the end
  // functon will return isValid: true
  return {
    errors, // same as errors: errors
    isValid: isEmpty(errors)
  };
};
