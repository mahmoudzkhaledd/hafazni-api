const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');
exports.addUpdatePlan = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    req.body.memorizerFrom = userModel.id;
    let plan;
    if (req.body.id == null) {
        plan = await Plan.create(req.body);
    } else {
        plan = await Plan.findById(req.body.id);
        delete req.body.id;
        if (plan != null) {
            const x = await plan.updateOne(req.body);
        } else {
            plan = await Plan.create(req.body);
        }
    }

    return res.status(200).json(plan);
});