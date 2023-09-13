const asyncHandeler = require('express-async-handler');
const jwt = require('jsonwebtoken')
exports.tokenValidator = asyncHandeler(async (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1];
        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        res.locals.userModel = userModel;
        return next();
    } catch (err) {

        return res.status(401).json({ "msg": "Unauthorized !" });
    }
})