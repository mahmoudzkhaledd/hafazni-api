const User = require('../../../../Models/User');
const asyncHandeler = require('express-async-handler');

exports.loadUserById = asyncHandeler(async (req, res, next) => {
    const userId = req.params.id;
    const user = await User.findById(userId, { password: 0 })
        .populate('memorizerData');
    if (user == null) {
        return res.status(420).json({ msg: "user not found !" });
    }
    let currentPlansCount = null;
    if (user.memorizerData != null && user.memorizerData.plans != null) {
        currentPlansCount = user.memorizerData.plans.length;
        user.memorizerData.plans = null;
    }

    return res.status(200).json({ user, currentPlansCount });
});