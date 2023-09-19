const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "id is required"],
    },
    seq: {
        type: Number,
        default: 0,
    },
}, { timestamps: true, });
const CounterModel = mongoose.model('Counter', schema);

exports.increment = (id) => {
    return new Promise(
        async (res, rej) => {
            const counter = await CounterModel.findOneAndUpdate({}, {
                _id: id,
                $inc: { seq: 1 },
            }, { upsert: true, new: true, setDefaultsOnInsert: true });
            return res(counter.seq + 1);
        }
    );
}