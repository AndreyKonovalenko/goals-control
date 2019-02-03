const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  goals: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: 'goals' // this is ref to mdb collection goals
      },
      title: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Profile = mongoose.model('porfile', ProfileSchema);
