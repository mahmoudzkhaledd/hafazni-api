const appRoute = require('express').Router({ mergeParams: true, });
const { checkUserID } = require('./Validator/validateUserId');
const { verifyEmailValidator } = require('./Validator/verifyEmailValidator');
const { verifyEmail } = require('./Service/VerifyEmail');
const { resendEmail } = require('./Service/ResendEmail');
appRoute.route('/')
    .post(checkUserID, verifyEmailValidator, verifyEmail);

appRoute.route('/resend').get(checkUserID, resendEmail);

module.exports = appRoute;