const appRouter = require('express').Router();
const { signOut } = require('./Services/SignOutService');
const { validatorMiddleware } = require('../../../middlewares/UserValidatorMiddleware');
appRouter.route('/').post(validatorMiddleware, signOut);


module.exports = appRouter;