const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    code: {
        type: String,
        length: 8,
        required: [true, "Code is required !"]
    },
    userId: { 
        index: true,
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Name is required !"]
    },
    users: {
        type: Number,
        default: 0,
    },
    maxUsers: {
        type: Number,
        default: null,
    },
    productsUseIt: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        required: [true, "Discount is required !"]
    },
    percentage: {
        type: Boolean,
        required: [true, "Percentage is required !"]
    },
    valid: {
        type: Boolean,
        default: true,
    },
    startingDate: {
        type: Date,
        default: Date.now(),
    },
    endingDate: {
        type: Date,

        default: null,
    },
}, { timestamps: true, });

module.exports = mongoose.model('PromoCode', schema);