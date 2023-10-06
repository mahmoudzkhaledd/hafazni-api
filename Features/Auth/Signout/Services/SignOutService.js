const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');

exports.signOut = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    if (userModel == null) {
        return res.sendStatus(200);
    }
    const result = await User.updateOne({ _id: userModel.id }, {
        deviceId: null,
    });

    res.sendStatus(200);

});