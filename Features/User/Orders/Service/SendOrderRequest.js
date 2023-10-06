const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');
const Plan = require('../../../../Models/Plan');
const Coupon = require('../../../../Models/PromoCode');
const { pushNotificationByDeviceId: pushNotification } = require('../../../../services/Firebase/Notifications/PushNotification');
const User = require('../../../../Models/User');
exports.sendOrderRequest = asyncHandeler(async (req, res, next) => {
    const body = req.body;
    if (body.memorizerTo == null || body.memorizerTo.length == 0) {
        return res.sendStatus(401);
    }
    delete body.afterCoupon
    const plan = await Plan.findById(req.params.planId);
    if (plan == null || plan.state != 'accepted') {
        return res.sendStatus(401);
    }
    if (body.promoCode != null) {
        const coupon = await Coupon.findById(body.promoCode);
        if (coupon != null) {
            if (coupon.percentage) {
                body.afterCoupon = plan.price * (1 - coupon.discount / 100);
            } else {
                body.afterCoupon = plan.price - coupon.discount;
            }
        }
    } else {
        if (plan.afterDiscount != null) {
            body.afterCoupon = plan.afterDiscount
        } else {
            body.afterCoupon = plan.price;
        }
    }
    //const order = await Order.create(body);
    body.state = "sent";
    let order;
    if (req.body._id == null) {
        order = await Order.create(req.body);
    } else {
        order = await Order.findByIdAndUpdate(req.body._id, req.body);
        order.state = req.body.state;
        if (order == null) {
            order = await Order.create(req.body);
        }
    }
    if (order.state == 'sent') {
        const deviceId = (await User.findById(order.memorizerTo, { deviceId: 1 })).deviceId;
        if (deviceId != null) {
            await pushNotification(deviceId,
                'طلب تدريب جديد',
                "طلب تدريب جديد, اضغط لمعرفة التفاصيل",
                {
                    orderId: order._id.toString(),
                });
        }

    }

    res.status(200).json({ order });
});