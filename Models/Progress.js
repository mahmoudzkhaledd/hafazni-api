const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    memorizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Memorizer Id is required"],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required"],
    },
    group: {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
        required: [true, "Group Id is required"],
    },
    progress: [{
        point: {
            type: Number,
            default: 0,
        },
        note: {
            type: String,
            default: null,
        },
    }],
}, { timestamps: true, });

module.exports = mongoose.model('Progress', schema);