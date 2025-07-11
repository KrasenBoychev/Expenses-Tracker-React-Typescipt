const { Schema, model, Types } = require('mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    budgets: { 
        type: [ Types.ObjectId ], 
        ref: 'Budget' 
    }
});
const User = model('users', UserSchema);
User.createIndexes();

module.exports = { User };