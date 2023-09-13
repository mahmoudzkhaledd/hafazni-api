const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    memorizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Memorizer Id is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    startingTime: {
        type: Date,
        required: [true, "Starting Time is required"],
    },
    days: [{
        type: {
            dayNumber: {
                type: Number,
                required: [true, "Day is required"],
                max: 7,
                min: 1,
            },
            tasks: [{
                surah: {
                    type: Number,
                    max: 144,
                    min: 1,
                    required: [true, "Ayah From is required"],
                },
                from: {
                    type: Number,
                    required: [true, "Ayah From is required"],
                },
                to: {
                    type: Number,
                    required: [true, "Ayah From is required"],
                },
            }],
            past: [{
                surah: {
                    type: Number,
                    max: 144,
                    min: 1,
                    required: [true, "Ayah From is required"],
                },
                from: {
                    type: Number,
                    required: [true, "Ayah From is required"],
                },
                to: {
                    type: Number,
                    required: [true, "Ayah From is required"],
                },
            }],
        },
        required: [true, "day task is required"],
    }]
}, { timestamps: true, });

module.exports = mongoose.model('Program', schema);