const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');
const Order = require('../../../../Models/Order');

exports.getPlan = asyncHandeler(async (req, res, next) => {
    if (req.params.id == null) {
        return res.status(401).json({ msg: "not found !" });
    }
    const userModel = res.locals.userModel;
    const plan = await Plan.findById(req.params.id);

    let order;
    if (plan.memorizerFrom != userModel.id) {
        if (plan.state != "accepted") {
            return res.sendStatus(402);
        }
        await plan.populate('memorizerFrom', {
            _id: 1,
            firstName: 1,
            lastName: 1,
            profilePic: 1,
            country: 1,
        });

        order = await Order.findOne(
            { 
                userFrom: userModel.id, 
                planId: plan._id 
            },
            { _id: 1, state: 1, }
        );

        // if (order != null && order.state == 'canceled') {
        //     order = null;
        // }

    }

    return res.status(200).json({ plan, order });
});