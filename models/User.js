const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = User = mongoose.model('user', UserSchema);
