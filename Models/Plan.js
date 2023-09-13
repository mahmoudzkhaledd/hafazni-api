const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    memorizerFrom: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Memorizer Id is required"],
    },
    title: {
        type: String,
        default: "",
        required: [true, "title is required !"]
    },
    description: String,
    duration: {
        type: Number,
        default: null,
    },
    preRequisites: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: [true, "price is required"],
    },
    afterDiscount: {
        type: Number,
        default: null,
    },
    promoCode: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "PromoCode",
        }],
        default: [],
    },
    state: {
        type: String,
        enum: ['pending', 'accepted', 'refused', 'saved'],
        default: 'pending',
    },
    rating: {}
}, { timestamps: true, });

module.exports = mongoose.model('Plan', schema);