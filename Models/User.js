const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required!"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required!"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: Boolean,
        required: [true, "Gender is required!"]
    },
    birthdate: {
        type: Date,
        required: [true, "Birth Date is required!"]
    },
    wallet: {
        type: mongoose.Schema.ObjectId,
        default: null,
        ref: 'Wallet'
    },
    country: {
        type: String,
        required:[true,"Country Date is required!"]
    },
    prifilePic: String,
    userData: {
        type: mongoose.Schema.ObjectId,
        ref: "UserData",
        default: null,
    },
    memorizerData: {
        type: mongoose.Schema.ObjectId,
        ref: "MemorizerData",
        default: null,
    },
}, { timestamps: true, });

module.exports = mongoose.model('User', schema);