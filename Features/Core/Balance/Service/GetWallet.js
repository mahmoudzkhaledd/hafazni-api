const asyncHandeler = require('express-async-handler');
const Wallet = require('../../../../Models/Wallet');
const User = require('../../../../Models/User');

exports.getWallet = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const user = await User.findById(userModel.id, { wallet: 1 });
    const wallet = await Wallet.findOne({
        userId: user._id,
    });
    if (user.wallet == null) {
        if (wallet != null) {
            user.wallet = wallet._id;
            await user.save();
        }
    }

    return res.status(200).json({ wallet });
});