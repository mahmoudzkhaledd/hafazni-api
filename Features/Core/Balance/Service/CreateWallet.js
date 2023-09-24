const asyncHandeler = require('express-async-handler');
const Wallet = require('../../../../Models/Wallet');
const User = require('../../../../Models/User');

exports.createWallet = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    let wallet = await Wallet.findOne({ userId: userModel.id });
    if (wallet == null) { 
        wallet = await Wallet.create({
            userId: userModel.id,
        }).catch(err => null);
    }
   
    if (wallet == null || wallet.userId.toString() != userModel.id) {
        return res.sendStatus(401);
    }
    await User.updateOne({ _id: userModel.id }, { wallet: wallet._id });
    return res.status(200).json({ wallet });
});