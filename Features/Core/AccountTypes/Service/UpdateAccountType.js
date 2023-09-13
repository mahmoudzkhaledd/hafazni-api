const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const MemorizerData = require('../../../../Models/MemorizerData');
const { uploadFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const UserData = require('../../../../Models/UserData');

exports.updateUserAccountType = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const userData = await UserData.findOne({ userId: userModel.id });
    const body = req.body;
    let state = "";
    if (userData != null) {
        if (body.from != null && body.to != null) {
            userData.target.targets.push({
                from: body.from,
                to: body.to,
            });
        }
        if (body.notes != null) {
            userData.target.notes = body.notes;
        }
        await userData.save();
        state = userData.state;
        await User.updateOne({ _id: userModel.id }, {
            userData: userData._id,
        });
    } else {
        body.userId = userModel.id;
        const userData = await UserData.create({
            userId: userModel.id,
            target: {
                targets: [{
                    from: body.from,
                    to: body.to,
                }],
                notes: body.notes,
            },
            state: 'accepted',
        });
        await User.updateOne({ _id: userModel.id }, {
            userData: userData._id
        });
        state = userData.state;
    }
    return res.status(200).json({ state: state });
});

exports.removeUserAccountType = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const result = await UserData.deleteOne({ userId: userModel.id });
        await User.updateOne({ _id: userModel.id }, { userData: null });
        res.sendStatus(200);
    }
);
exports.removeMemorizerAccountType = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const result = await MemorizerData.deleteOne({ userId: userModel.id });
        await User.updateOne({ _id: userModel.id }, { memorizerData: null });
        res.sendStatus(200);
    }
);



// certificants
// describtion
// readings 
exports.updateMemorizerAccountType = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const user = await User.findById(userModel.id, { _id: 1, });
    if (user == null) {
        return res.status(404).json({ msg: "user not found !" });
    }
    const { description, readings, save } = req.body;
    let url;
    if (req.file != null) {
        url = req.file != null ? await uploadFile(req.file)
            .then(res => res)
            .catch(err => null) : null;
    }
    const options = {
        certificant: url,
        readings: readings,
        description: description,
        state: process.env.APP_MODE == "dev" ? "accepted" : save == true ? "save" : "pending",
    };
    if (url == null) {
        delete options.certificant;
    }
    const memoData = await MemorizerData
        .findOneAndUpdate(
            { userId: userModel.id },
            options,
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
    await User.updateOne({ _id: userModel.id }, {
        memorizerData: memoData._id
    });
    res.status(200).json({ state: options.state })
});
