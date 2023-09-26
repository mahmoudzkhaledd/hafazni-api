const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');
//const User = require('../../../../Models/User');

const { pushNotification } = require('../../../../services/Firebase/Notifications/PushNotification');
const User = require('../../../../Models/User');
exports.changeOrderState = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const state = req.query.state || "pending";
    const order = res.locals.order;
    if (order.state == state || order.state == 'running') { 
        return res.sendStatus(402);
    }
    if ((order.state == 'canceled' || order.state == 'running') && order.memorizerTo == userModel.id) {
        return res.sendStatus(402);
    }

    const plan = await Plan.findById(order.planId);
    if (plan.state != "accepted" && order.memorizerTo == userModel.id) {
        return res.sendStatus(403);
    }

    if ((state == "accepted" || state == "refused") && order.memorizerTo != userModel.id) {
        return res.sendStatus(402);
    }

    if (order.userFrom._id != userModel.id && state == "canceled") {
        return res.sendStatus(402);
    }

    // memorizer can change state ony if order is not accepted.

    // if ((order.state == "accepted") && order.memorizerTo == userModel.id) {
    //     return res.sendStatus(402);
    // }
    order.state = state;
    if (order.state == "accepted" && order.memorizerTo == userModel.id) {
        const deviceId = (await User.findById(order.userFrom, { deviceId: 1 })).deviceId;
        if (deviceId != null) {
            await pushNotification(deviceId,
                "تم قبول الطلب",
                'من قبل المحفظ اضغط للدخول الى الطلب',
                {
                    orderId: order._id.toString(),
                });
        }
    }
    await order.updateOne({
        state: state,
    });

    return res.status(200).json({ order });
})