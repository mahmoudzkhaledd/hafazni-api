const jwt = require('jsonwebtoken');
//const User = require('../Models/User');
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
           // const user = await User.findById(userModel.id, { _id: 1, deviceId: 1, });
            if (user != null) {
               // res.locals.userModel.deviceId = user.deviceId;
                return next();
            } else {
                return res.status(455).json({ "msg": "Unauthorized !" });
            }
        }
    } catch (err) {
        return res.status(455).json({ "msg": "Unauthorized !" });
    }
}