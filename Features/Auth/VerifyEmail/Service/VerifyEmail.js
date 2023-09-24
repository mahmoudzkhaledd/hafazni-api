const ApiError = require('../../../../Error_Handeler/ApiError');
const EmailVerification = require('../../../../Models/VerificationEmail');
const bcrypt = require('bcrypt');
const User = require('../../../../Models/User');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
const jwt = require('jsonwebtoken');

exports.verifyEmail = async (req, res, next) => {
    const { code } = req.body;
    const userModel = res.locals.userModel;
    const userId = res.locals.userModel.id;

    const userTo = await User.findById(userId, { verifiedEmail: 1 })
    if (userTo == null) {
        await EmailVerification.deleteOne({ userTo: userId, });
        return next(new ApiError('User is not rejistered !', 404));
    }
    if (userTo.verifiedEmail == true) {
        await EmailVerification.deleteOne({ userTo: userId, });
        return next(new ApiError('User is Verified !', 405))
    }
    const email = await EmailVerification.findOne({ userTo: userId, });
    if (email == null) {
        return next(new ApiError('Please Resend Verification Email !', 406));
    }
    const match = await bcrypt.compare(`${code}`, email.code);
    if (!match) {
        email.mistakeTrails--;
        if (email.mistakeTrails == 0) {
            await userTo.deleteOne();
            await email.deleteOne();

            return next(new ApiError(`You have attempted all trails you have, The email has been deleted.`, 420));
        } else {
            await email.save();
            return res.status(409).json({
                msg: `You Have ${email.mistakeTrails} valid trails and your account will be deleted !`,
                trails: email.mistakeTrails,
            });
        }
    }
    await email.deleteOne({});

    userModel.verifiedEmail = true;

    await userTo.save();


    const token = jwt.sign(userModel, process.env.ACCESS_TOKEN_KEY);

    return res.status(200).json({
        token,
        "user": userTo,
        appConfigs: configs,
    });
}