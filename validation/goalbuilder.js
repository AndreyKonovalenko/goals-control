const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.limitation = !isEmpty(data.limitation) ? data.limitation : '';
  data.from = !isEmpty(data.from) ? data.from : ''; //

  if (!Validator.isLength(data.title, { min: 1, max: 30 })) {
    errors.title = 'Name must be at least 1 character';
  }

  if (!Validator.isEmpty(data.title)) {
    errors.email = 'Name field is required';
  }

  if (!Validator.isEmpty(data.Limitation)) {
    errors.email = 'Limitation field is required';
  }

  if (!Validator.isNumeric(data.Limitation)) {
    errors.email = 'Limitation field must contain only numbers';
  }

  if (!Validator.isEmpty(data.from)) {
    errors.email = 'Sart Date field is required';
  }

  return {
    errors, // same as errors: errors
    isValid: isEmpty(errors)
  };
};
