const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateGoalInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.limitation = !isEmpty(data.limitation) ? data.limitation : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (!Validator.isLength(data.title, { min: 1, max: 30 })) {
    errors.title = 'Name must be at least 1 character';
  }

  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title field is required';
  }

  if (Validator.isEmpty(data.limitation)) {
    errors.limitation = 'Limitation field is required';
  }
  else {
    if (!Validator.isNumeric(data.limitation)) {
      errors.limitation = 'Limitation field must contain only numbers';
    }
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = 'Sart Date field is required';
  }

  return {
    errors, // same as errors: errors
    isValid: isEmpty(errors)
  };
};
