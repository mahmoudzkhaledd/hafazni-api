const validaotrMiddleware = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');

module.exports = [
    check('code').isLength(8).withMessage("promo code must be 8 characters !"),
    check('name').notEmpty(),
    check('discount').not()
        .isString()
        .withMessage('must be number').isNumeric()
        .withMessage('discount must be number'),
    check('percentage').isBoolean()
        .withMessage('discount must be boolean'),
    validaotrMiddleware,
];