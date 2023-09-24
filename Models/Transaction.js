const mongoose = require('mongoose');
const { increment } = require('./Counter');
const schema = new mongoose.Schema({
    number: {
        type: Number,
        default: 0,
    },
    walletId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wallet',
        index: true,
        required: [true, 'wallet id is required !'],
    },
    success: {
        type: Boolean,
        default: true,
    },
    operationType: {
        type: String,
        enum: ['deposit', 'withdraw', "profit", "pay", 'pend',],
        required: [true, 'Operation Type is required !'],
    },
    amount: {
        type: Number,
        required: [true, 'Operation Type is required !'],
    },
    note: {
        type: String,
        default: null,
    },
    orderId: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        default: null,
    },
}, { timestamps: true, });
schema.pre('save', function (next) {
    const doc = this;
    increment('transactions').then(function (count) {
        doc.number = count;
        next();
    });
})
module.exports = mongoose.model('Transaction', schema);