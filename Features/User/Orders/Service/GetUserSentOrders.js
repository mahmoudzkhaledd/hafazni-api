const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const Plan = require('../../../../Models/Plan');
const Coupon = require('../../../../Models/PromoCode');

exports.getUserSentOrders = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const toMe = req.query.toMe;
    let sentOrders;
    if (toMe == 'false') {
        sentOrders = await Order.find({ userFrom: userModel.id })
            .populate('memorizerTo', {
                _id: 1,
                firstName: 1,
                lastName: 1,
                profilePic: 1,
                country: 1,
            })
    } else {
        sentOrders = await Order.find({
            memorizerTo: userModel.id,
            $and: [
                { state: { $ne: 'pending' } },
                { state: { $ne: 'canceled' } },
            ]
        }).populate('userFrom', {
            _id: 1,
            firstName: 1,
            lastName: 1,
            profilePic: 1,
            country: 1,
        })
    }
    res.status(200).json({ orders: sentOrders, });
});