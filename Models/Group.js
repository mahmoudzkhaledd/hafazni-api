const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    memorizer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //required: [true, "Memorizer Id is required"],
    },
    name: {
        type: String,
        //required: [true, "Group Name is required"],
    },
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        //required: [true, "User Id is required"],
    }],
    groupChat: {
        type: mongoose.Schema.ObjectId,
        ref: "Chat",
        default: null,
    },
    suspended: {
        type: Boolean,
        default: false,
    },
    plans: {
        type: mongoose.Schema.ObjectId,
        ref: "Plan",
        //required: [true, "Plan id is required"],
    },
    programs: [{
        type: mongoose.Schema.ObjectId,
        ref: "Program",
        // required: [true, "Program id is required"],
    }],
    announcements: [{
        title: String,
        content: String,
        voice: String,
    }],
    startedAt: Date,
}, { timestamps: true, });

module.exports = mongoose.model('Group', schema);