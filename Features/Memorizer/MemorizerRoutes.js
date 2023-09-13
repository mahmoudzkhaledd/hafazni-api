const appRouter = require('express').Router();
const couponsRoutes = require('./Coupons/CouponsRoutes');
const plansRoutes = require('./Plans/PlansRoutes');
appRouter.use('/coupons', couponsRoutes);
appRouter.use('/plans', plansRoutes);
module.exports = appRouter;