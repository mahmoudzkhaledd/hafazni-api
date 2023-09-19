const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');

exports.signOut = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const result = await User.updateOne({ _id: userModel.id }, {
        deviceId: null,
    });
    console.log(result);
    res.sendStatus(result.modifiedCount != 0 ? 200 : 401);

});