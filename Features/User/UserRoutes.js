const appRouter = require('express').Router();
const orderRouts = require('./Orders/OrdersRoutes');
appRouter.use(orderRouts);

module.exports = appRouter;