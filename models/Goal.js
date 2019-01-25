const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creat Schema

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  period: {
    type: Number,
    required: true
  },
  days: [{
    day: {
      success: {
        type: Boolean,
        default: false
      },
      touched: {
        type: Boolean,
        default: false
      }
    }
  }]
});

module.exports = Goal = mongoose.model('goals', GoalSchema);
