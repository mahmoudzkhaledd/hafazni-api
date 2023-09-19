const appRoute = require('express').Router();
const { tryCouponPlan } = require('./Service/TryCoupon');
const { sendOrderRequest } = require('./Service/SendOrderRequest');
const { getUserSentOrders } = require('./Service/GetUserSentOrders');
const { getOrder } = require('./Service/GetOrder');
const { changeOrderState } = require('./Service/ChangeOrderState');
const { changeOrderValidation } = require('./Service/EditordercValidation');


appRoute.get('/plans/:planId/promoCode', tryCouponPlan);
appRoute.get('/sent-orders', getUserSentOrders);
appRoute.route('/order/:orderId')
    .get(getOrder)
    .put(changeOrderValidation, changeOrderState);

appRoute.post('/plans/:planId/order', sendOrderRequest);



module.exports = appRoute;