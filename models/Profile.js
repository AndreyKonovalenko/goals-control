const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  goals: [{
    goal: {
      type: Schema.Types.ObjectId,
      ref: 'goals' // this is ref to mdb collection goals
    }
  }]
});

module.exports = Profile = mongoose.model('porfile', ProfileSchema);
