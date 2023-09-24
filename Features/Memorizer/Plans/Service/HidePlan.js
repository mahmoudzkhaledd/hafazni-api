const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');
const Order = require('../../../../Models/Order');

exports.hidePlan = asyncHandeler(async (req, res, next) => {
    if (req.params.id == null) {
        return res.status(401).json({ msg: "not found !" });
    }
    const userModel = res.locals.userModel;

    const plan = await Plan.findOne({
        _id: req.params.id,
        memorizerFrom: userModel.id,
    });

    if (plan == null) {
        return res.sendStatus(401);
    }
    if (plan.state != "hidden") {
        const ordersCount = await Order.find({
            planId: req.params.id,
            $and: [
                { state: { $ne: 'refused' } },
                { state: { $ne: 'canceled' } },
            ],
        }).count();
        if (ordersCount != 0) {
            return res.sendStatus(402);
        }
        plan.state = "hidden";
    } else {
        plan.state = 'accepted';
    }
    await plan.save();
    res.status(200).json({ planState: plan.state, });
});