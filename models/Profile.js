const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  goals: {
    type: Array,
    require: true
  }
});

module.exports = Profile = mongoose.model('porfile', ProfileSchema);
