const jwt = require('jsonwebtoken');

exports.validatorMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!userModel.verifiedEmail && process.env.APP_MODE != 'dev') {
            return res.status(455).json({
                "msg": "Account is not verified !",
            });
        } else {
            res.locals.userModel = userModel;
            return next();
        }
    } catch (err) {
        return res.status(455).json({ "msg": "Unauthorized !" });
    }
}