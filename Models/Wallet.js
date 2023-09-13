const mongoose = require('mongoose');
const schema = new mongoose.Schema({
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
    transactions: [{
        operationType: String,
        date: Date,
        orderId: {
            type: mongoose.Schema.ObjectId,
            ref: "Order",
        },
    }],
}, { timestamps: true, });

module.exports = mongoose.model('Wallet', schema);