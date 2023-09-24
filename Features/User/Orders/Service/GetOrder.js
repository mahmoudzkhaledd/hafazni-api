const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');

exports.getOrder = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;

    const order = await Order.findById(req.params.orderId);
    if((order.state ==  'pending'||order.state == 'canceled') && order.memorizerTo._id == userModel.id){
       return res.sendStatus(401);
    }
    if (order != null && (order.userFrom._id == userModel.id || order.memorizerTo == userModel.id)) {
        await order.populate([
            { path: "promoCode", model: "PromoCode", },
            {
                path: "planId",
                model: "Plan",
                select: {
                    _id: 1,
                    title: 1,
                    price: 1,
                    afterDiscount: 1,
                    state: 1,
                }
            }
        ])
        console.log(order)
        res.status(200).json({ order: order, });
    } else {
        res.sendStatus(401);
    }
});