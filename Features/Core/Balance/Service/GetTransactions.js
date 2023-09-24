const asyncHandeler = require('express-async-handler');
const Wallet = require('../../../../Models/Wallet');
const Transaction = require('../../../../Models/Transaction');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.getTransactions = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const wallet = await Wallet.findOne({ userId: userModel.id });
    if (wallet == null) {
        return res.sendStatus(401);
    }
    let {
        begin,
        end,
    } = req.query;
    begin = Number(begin) || 0;
    end = Number(end) || configs.maxSearch;

    const transactions = await Transaction.find({ walletId: wallet._id })
        .skip(begin)
        .limit(end - begin);
    
    res.status(200).json({ transactions });
});