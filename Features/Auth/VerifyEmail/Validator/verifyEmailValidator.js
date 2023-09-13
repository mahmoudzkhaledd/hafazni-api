const jwt = require('jsonwebtoken');
const { check } = require('express-validator');
const validator = require('../../../../middlewares/validatorMiddleware');
module.exports.verifyEmailValidator = [
    check('code').notEmpty().withMessage("Please Enter Verification Code !"),
    validator,
]