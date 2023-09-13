const appRouter = require('express').Router();
const { loginUser } = require('./Services/Login');
const { loginValidator } = require('./Services/Validator');
const { tokenValidator } = require('./Services/tokenValidator');
// => /login

appRouter.route('/').post(loginValidator, loginUser);

appRouter.route('/token').post(tokenValidator, loginUser);

module.exports = appRouter;