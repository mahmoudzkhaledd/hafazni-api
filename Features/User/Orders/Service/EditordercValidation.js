const asyncHandeler = require('express-async-handler');
const Order = require('../../../../Models/Order');

exports.changeOrderValidation = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    const order = await Order.findById(req.params.orderId);
    if (order == null) {
        return res.sendStatus(401);
    }
    if (order.userFrom == userModel.id || order.memorizerTo == userModel.id) {
        res.locals.order = order;
        return next();
    }
    return res.sendStatus(402);
});