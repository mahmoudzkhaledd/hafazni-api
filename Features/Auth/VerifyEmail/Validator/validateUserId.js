const jwt = require('jsonwebtoken');
const asyncHandeler = require('express-async-handler');

exports.checkUserID = asyncHandeler(async (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (userModel.verifiedEmail) {
            return res.status(405).json({
                "msg": "Account is verified !",
            });
        } else {
            res.locals.userModel = userModel;
            return next();
        }
    } catch (err) {
        return res.status(401).json({ "msg": "Unauthorized !" });
    }
})