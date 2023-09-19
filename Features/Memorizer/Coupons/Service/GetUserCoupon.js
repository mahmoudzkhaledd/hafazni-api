const asyncHandeler = require('express-async-handler');
const PromoCode = require('../../../../Models/PromoCode');

exports.getUserCoupons = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const coupons = await PromoCode.find({ userId: userModel.id });

    res.status(200).json({ coupons: coupons });
});