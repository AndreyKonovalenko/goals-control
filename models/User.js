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
    },
    goals: [
        {
            goal: {
                type: Schema.Types.ObjectId,
                ref: 'goals' // this is ref to mdb collection goals
            }
        }
    ]
});

module.exports = User = mongoose.model('users', UserSchema);