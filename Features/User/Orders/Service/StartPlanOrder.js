const asyncHandeler = require('express-async-handler');
const PromoCode = require('../../../../Models/PromoCode');
const Order = require('../../../../Models/Order');
const Wallet = require('../../../../Models/Wallet');
const Plan = require('../../../../Models/Plan');

exports.startPlan = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const order = await Order.findById(req.params.orderId);
    if (order == null || order.afterCoupon == null || (order.state != 'accepted' && order.state != 'running')) {
        return res.sendStatus(401);
    }
    const wallet = await Wallet.findOne({ userId: userModel.id });
    if (wallet == null) {
        return res.sendStatus(405);
    }
    if (order.afterCoupon > wallet.balance) {
        return res.sendStatus(402);
    }
    order.state = 'running';
    wallet.balance -= order.afterCoupon;
    wallet.pending += order.afterCoupon;
    const memWallet = await Wallet.findOneAndUpdate({ userId: order.memorizerTo }, {
        $inc: {
            pending: order.afterCoupon,
        }
    });
    await wallet.save();
    await order.save();
    await Plan.updateOne({ _id: order.planId }, {
        $inc: { students: 1 }
    });
    if (order.promoCode != null) {
        await PromoCode.updateOne({ _id: order.promoCode }, {
            $inc: {
                users: 1,
            }
        })
    }
    res.locals.transaction = [
        {
            walletId: wallet._id,
            orderId: order._id,
            operationType: 'pay',
            amount: order.afterCoupon,
        },
        {
            walletId: wallet._id,
            orderId: order._id,
            operationType: 'pend',
            amount: order.afterCoupon,
        },
    ];
    if (memWallet != null) {
        res.locals.transaction.push({
            walletId: memWallet._id,
            orderId: order._id,
            operationType: 'pend',
            amount: order.afterCoupon,
        });
    }
    res.sendStatus(200);
    next();
});