const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  limitation: {
    type: Number,
    required: true
  },
  days: {
    type: Array,
    required: true
  }

});

module.exports = Goal = mongoose.model('goal', GoalSchema);
