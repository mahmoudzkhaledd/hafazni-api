const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');

exports.getUserPlans = asyncHandeler(async (req, res, next) => {
    const userId = req.params.id;
    const plans = await Plan.find(userId != "all" ? { memorizerFrom: userId } : {});
    res.status(200).json(plans);
});