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
            let counter = await CounterModel.findByIdAndUpdate(id, {
                $inc: { seq: 1 }
            });
            if (counter == null) {
                counter = await CounterModel.create({
                    _id: id,
                    seq: 1,
                });
            }

            return res(counter.seq + 1);
        }
    );
}