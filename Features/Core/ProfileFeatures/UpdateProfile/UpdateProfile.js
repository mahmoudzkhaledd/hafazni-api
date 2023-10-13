const { uploadFile, deleteFile } = require('../../../../services/Firebase/Storage/StorageUpload');
const User = require('../../../../Models/User');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.updateProfile = async (req, res, next) => {
    const userModel = res.locals.userModel;
    // const user = await User.findById(userModel.id);
    if (req.body.birthdate != null) {
        req.body.birthdate = req.body.birthdate.split(' ')[0];
    }
    const result = await User.findOneAndUpdate({ _id: userModel.id }, req.body, {
         returnOriginal: false
    });
    res.status(200).json({ result });
}
exports.uploadPhoto = async (req, res, next) => {
    const userModel = res.locals.userModel;
    const user = await User.findById(userModel.id);
    if (user == null) {
        return res.sendStatus(404);
    }
    if (user.profilePic != null) { 
        await deleteFile(user.profilePic);
    }
    if(req.file.size > configs.maxFileSize){
        return res.sendStatus(401);
    }
    const url = await uploadFile(req.file, `users/${user._id}`, 'profilePic');
    if (url != null) {
        await user.updateOne({ profilePic: url });
        return res.status(200).json({ url: url });
    }
    res.sendStatus(400);
}
exports.deletePhoto = async (req, res, next) => {
    const userModel = res.locals.userModel;
    const user = await User.findById(userModel.id);
    if (user == null) {
        return res.sendStatus(404);
    }
    if (user.profilePic == null) {
        return res.sendStatus(404);
    }
    const ans = await deleteFile(user.profilePic);
    if (ans) {
        await user.updateOne({ profilePic: null });
    }
    res.status(200).json({
        "res": ans,
    });
}