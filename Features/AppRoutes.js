const appRoute = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const userRoute = require('./User/UserRoutes');
const coreRoute = require('./Core/CoreRoutes');
const memorizerRoute = require('./Memorizer/MemorizerRoutes');
const { validatorMiddleware } = require('../middlewares/UserValidatorMiddleware');




appRoute.use(authRoutes);

appRoute.use(validatorMiddleware);

appRoute.use(userRoute);
appRoute.use(coreRoute);
appRoute.use(memorizerRoute);


appRoute.all('*', (req, res) => {
    res.status(404).json({ msg: "Can't find this route" });
});

module.exports = appRoute;