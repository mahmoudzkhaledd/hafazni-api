const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports.loginValidator = [
    check('email').isEmail().withMessage("please enter valid email"),
    check('password').isLength({ min: 8, max: 32 }).withMessage('password must be between 8 and 32 characters'),
    validator,
];