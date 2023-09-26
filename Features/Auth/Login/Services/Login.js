const asyncHandeler = require('express-async-handler');
const User = require('../../../../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appConfigs = require('../../../../ServerConfigs/ServerConfigs.json');
exports.loginUser = asyncHandeler(async (req, res, next) => {
    const { email, password } = req.body;
    let user;
    const userModel = res.locals.userModel;
    if (userModel != null) {
        user = await User.findById(userModel.id)
            .populate('userData')
            .populate("memorizerData");
    } else {
        user = await User.findOne({ email: email })
            .populate('userData')
            .populate("memorizerData");
    }

    if (user == null) return res.status(401)
        .json({ msg: 'Please Check Your Email and Password' });
    if (userModel == null) {
        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401)
            .json({ msg: 'Please Check Your Email and Password' });
    }
    user.password = null;
    const tokenModel = {
        "id": user._id,
        "verifiedEmail": user.verifiedEmail,
    };
    let token = null;
    if (userModel == null) {
        token = await jwt.sign(tokenModel, process.env.ACCESS_TOKEN_KEY);
    }
    if (!user.verifiedEmail) {
        return res.status(402).json({
            "msg": "Email Is Not Verified!",
            user,
            token,
        });
    }
    if (req.body.deviceToken != null && user.deviceId != req.body.deviceToken)
        await user.updateOne({ deviceId: req.body.deviceToken });

    return res.status(200).json({
        user,
        token,
        appConfigs,
    });
});

