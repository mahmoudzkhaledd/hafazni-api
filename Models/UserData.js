const mongoose = require('mongoose');
const states = require('../ServerConfigs/ServerConfigs.json').accountTypesStates;
const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required !"],
    },
    state: {
        type: String,
        enum: states,
        default: states[0],
    },
    refusedReason: String,
    target: {
        type: {
            targets: [{
                from: Number,
                to: Number,
            }],
            notes: {
                type: String,
                default: "",
            },
        },
        default: null,
    },
    memorizeHistory: {
        type: {
            memorizeHistory: [{
                from: Number,
                to: Number,
            }],
            notes: String,
        },
        default: null,
    }
}, { timestamps: true, });

module.exports = mongoose.model('UserData', schema);