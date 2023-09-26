const asyncHandeler = require('express-async-handler');
const MemorizerData = require('../../../../Models/MemorizerData');
const PromoCode = require('../../../../Models/PromoCode');

exports.addCoupon = asyncHandeler(async (req, res, next) => {
    
    const userModel = res.locals.userModel;
    const data = await MemorizerData.findOne({ userId: userModel.id });
    if (data == null) {
        return res.send(401).json({
            "status": "unAuthorized",
        });
    }
    const temp = await PromoCode.findOne({
        userId: userModel.id,
        $or: [
            { code: req.body.code, },
            { name: req.body.name },
        ]
    });
    if (temp != null) {
        return res.status(402).json({
            "sameCode": temp.code == req.body.code,
            "sameName": temp.name == req.body.name,
        });
    }
    req.body.userId = userModel.id;
    if (req.body.startingDate != null) { 
        req.body.startingDate =  req.body.startingDate.split(' ')[0];
    }
    if (req.body.endingDate != null) { 
        req.body.endingDate =  req.body.endingDate.split(' ')[0];
    }
    const promoCode = await PromoCode.create(req.body);
    data.promoCodes.push(promoCode._id);
    await data.save();
    res.status(200).json(promoCode);
});