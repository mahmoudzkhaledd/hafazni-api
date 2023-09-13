const asyncHandeler = require('express-async-handler');
const PromoCode = require('../../../../Models/PromoCode');

exports.changeCouponState = asyncHandeler(async (req, res, next) => {
    let { couponId, state } = req.body;
    state = state || false;
    const userModel = res.locals.userModel;
    const promo = await PromoCode.updateOne({ userId: userModel.id, _id: couponId }, { valid: state, });
    if (promo.matchedCount == 0) {
        return res.sendStatus(401);
    }

    res.json(promo);
})