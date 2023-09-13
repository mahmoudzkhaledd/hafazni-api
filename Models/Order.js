const mongoose = require('mongoose');
const schema = new mongoose.Schema({
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
    startingTime: {
        type: Date,
        default: null,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    planId: {
        type: mongoose.Schema.ObjectId,
        ref: "Plan",
        required: [true, "Plan Id is required"],
    },
}, { timestamps: true, });

module.exports = mongoose.model('Order', schema);