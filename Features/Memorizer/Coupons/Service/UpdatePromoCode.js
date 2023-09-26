const asyncHandeler = require('express-async-handler');
const PromoCode = require('../../../../Models/PromoCode');

exports.updatePromoCode = asyncHandeler(async (req, res, next) => {

    if (req.body.startingDate != null) { 
        req.body.startingDate =  req.body.startingDate.split(' ')[0];
    }
    if (req.body.endingDate != null) { 
        req.body.endingDate =  req.body.endingDate.split(' ')[0];
    }
    const { couponId, startingDate, endingDate, maxUsers, name } = req.body;
    const userModel = res.locals.userModel;
    const promo = await PromoCode.find({ userId: userModel.id });
    if (promo.length == 0) {
        return res.sendStatus(401);
    }

    let tmp;
    promo.forEach(p => {
        if (p.name == name && p._id != couponId) {
            return res.sendStatus(402);
        }
        if (p._id == couponId) {
            tmp = p;
        }
    });

    if (tmp == null) {
        return res.sendStatus(401);
    }

    tmp.startingDate = startingDate;
    tmp.endingDate = endingDate;
    tmp.maxUsers = maxUsers;
    tmp.name = name;
    await tmp.save();
    res.sendStatus(200);
})

exports.deletePromoCode = asyncHandeler(async (req, res, next) => { 
    let { couponId } = req.body;
    const userModel = res.locals.userModel;
    const promo = await PromoCode.deleteOne({ userId: userModel.id, _id: couponId });
    if (promo.matchedCount == 0) {
        return res.sendStatus(401);
    }
    res.sendStatus(200);
});