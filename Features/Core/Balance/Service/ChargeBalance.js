const asyncHandeler = require('express-async-handler');
const Wallet = require('../../../../Models/Wallet');

exports.chargeBalance = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const wallet = await Wallet.findById(req.body.walletId);
    if (wallet == null || wallet.userId.toString() != userModel.id || req.body.price == null) {
        return res.sendStatus(401);
    }
    wallet.balance += req.body.price;
    await wallet.save();
    res.locals.transaction = {
        walletId: wallet._id,
        operationType: 'deposit',
        amount: req.body.price,
    }

    res.status(200).json({
        balance: wallet.balance,
    });
    next();
});