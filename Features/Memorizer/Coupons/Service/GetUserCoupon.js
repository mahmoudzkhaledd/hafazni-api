const asyncHandeler = require('express-async-handler');
const PromoCode = require('../../../../Models/PromoCode');

exports.getUserCoupons = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const price = Number(req.query.price) || null;

    const opts = price != null ? {
        userId: userModel.id,
        $or: [
            { percentage: true },
            {
                $and: [
                    { percentage: false },
                    {
                        discount: { $lte: price }
                    }
                ]
            }
        ]
    } : { userId: userModel.id, };
    console.log(opts)
    const coupons = await PromoCode.find(opts);

    res.status(200).json({ coupons: coupons });
});