const mongoose = require('mongoose');
const { increment } = require('./Counter');

const schema = new mongoose.Schema({
    number: {
        type: Number,
        default: 0,
    },
    userFrom: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
    memorizerTo: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Memorizer Id is required"],
    },
    note: String,
    state: {
        type: String,
        enum: ['pending', 'sent', 'accepted', 'running', 'refused', 'canceled'],
        default: 'sent',
    },
    planId: {
        type: mongoose.Schema.ObjectId,
        ref: "Plan",
        required: [true, "Plan Id is required"],
    },
    promoCode: {
        type: mongoose.Schema.ObjectId,
        ref: "PromoCode",
        default: null,
    },
    afterCoupon: {
        type: Number,
        default: null,
    },

}, { timestamps: true, });


schema.pre('save', function (next) {
    const doc = this;
    increment('orders').then(function (count) {
        doc.number = count;
        next();
    });
})

module.exports = mongoose.model('Order', schema);