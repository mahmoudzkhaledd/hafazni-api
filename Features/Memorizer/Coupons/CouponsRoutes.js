const appRouter = require('express').Router();
const { addCoupon } = require('./Service/AddCouponService');
const addCouponvalidator = require('./Validators/AddPromoCodeValidator');
const { getUserCoupons } = require('./Service/GetUserCoupon');
const { changeCouponState } = require('./Service/ChangeCouponState');
const { updatePromoCode,deletePromoCode } = require('./Service/UpdatePromoCode');

appRouter.route('/')
    .post(addCouponvalidator, addCoupon)
    .get(getUserCoupons).put(updatePromoCode)
    .delete(deletePromoCode);
appRouter.route('/state').put(changeCouponState);
module.exports = appRouter;