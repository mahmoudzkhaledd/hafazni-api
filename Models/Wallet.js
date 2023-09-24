const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        index: true,
        unique: true,
        ref: 'User',
        required: [true, 'user id is required'],
    },
    pending: {
        type: Number,
        default: 0,
    },
    spent: {
        type: Number,
        default: 0,
    },
    balance: {
        type: Number,
        default: 0,
    },
    earn: {
        type: Number,
        default: 0,
    },

}, { timestamps: true, });

module.exports = mongoose.model('Wallet', schema);