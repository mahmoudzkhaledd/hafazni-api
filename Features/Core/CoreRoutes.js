const appRouter = require('express').Router();
const accountTypesRoute = require('./AccountTypes/AccountTypes');
const updateProfileRoute = require('./UpdateProfile/UpdateProfileRoute');
const searchMemroizerRoutes = require('./SearchMemorizers/SearchMemorizerRoutes');
const userRoutes = require('./GetUser/GetUserRoute');

appRouter.use("/account-types", accountTypesRoute);
appRouter.use("/profile", updateProfileRoute);
appRouter.use("/search-memorizers", searchMemroizerRoutes);
appRouter.use("/users", userRoutes);

module.exports = appRouter;