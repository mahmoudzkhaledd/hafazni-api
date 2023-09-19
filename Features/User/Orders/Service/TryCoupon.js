const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');

exports.tryCouponPlan = asyncHandeler(async (req, res, next) => {
    const planId = req.params.planId;
    const code = req.query.code || "";
    const plan = await Plan.findById(planId).populate('promoCode');
    if (plan == null) {
        return res.status(401).json({
            msg: "plan Not found !",
        });
    }
    let promoCode;
    for (let i = 0; i < plan.promoCode.length; i++) {
        if (plan.promoCode[i].code == code) {
            promoCode = plan.promoCode[i];
            break;
        }
    }
    const sDate = promoCode.startingDate == null || (Date.now()>= promoCode.startingDate);
    const eDate = promoCode.endingDate == null || (promoCode.endingDate >= Date.now());

    if (promoCode == null || (promoCode.users >= promoCode.maxUsers && promoCode.maxUsers != null) || !promoCode.valid || !sDate || !eDate) {
        return res.status(402).json({
            msg: "promocode is not correct!",
        });
    }

    res.status(200).json(promoCode);
});