const mongoose = require('mongoose');
const states = require('../ServerConfigs/ServerConfigs.json').accountTypesStates;

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        index:true,
        required: [true, "User id is required !"]
    },
    state: {
        type: String,
        enum: states,
        default: states[0],
    },
    refusedReason: String,
    certificant: {
        type: String,
        default: null,
    },
    rating: {
        type: Number,
        default: 0,
    },
    accountVip: {
        type: Boolean,
        default: false,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    doneTasks: {
        type: Number,
        default: 0,
    },
    description: String, // 
    readings: [{ //
        type: Number,
        min: 1,
        max: 10,
    }],
    plans: [{
        type: mongoose.Schema.ObjectId,
        ref: "Plan",
        required: [true, "Plan Id is required!"],
    }],
    promoCodes: [{
        type: mongoose.Schema.ObjectId,
        ref: "PromoCode",
        required: [true, "Promo Code Id is required!"],
    }],

}, { timestamps: true, });

module.exports = mongoose.model('MemorizerData', schema);