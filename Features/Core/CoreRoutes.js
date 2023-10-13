const appRouter = require('express').Router();
const accountTypesRoute = require('./AccountTypes/AccountTypes');

const searchMemroizerRoutes = require('./SearchMemorizers/SearchMemorizerRoutes');
const userRoutes = require('./ProfileFeatures/GetUserRoute');
const balanceRoutes = require('./Balance/BalanceRoutes');

appRouter.use('/wallet', balanceRoutes);
appRouter.use("/account-types", accountTypesRoute);

appRouter.use("/search-memorizers", searchMemroizerRoutes);
appRouter.use("/users", userRoutes);

module.exports = appRouter;