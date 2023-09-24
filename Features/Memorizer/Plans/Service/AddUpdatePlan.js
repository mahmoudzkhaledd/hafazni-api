const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');
const MemorizerData = require('../../../../Models/MemorizerData');
exports.addUpdatePlan = asyncHandeler(async (req, res, next) => {
    const userModel = res.locals.userModel;
    req.body.memorizerFrom = userModel.id;
    let plan;
    if (req.body.id == null) {
        req.body.state = 'accepted';
        plan = await Plan.create(req.body);
    } else {
        plan = await Plan.findById(req.body.id);
        delete req.body.id;
        req.body.state = 'accepted';
        if (plan != null) {
            const x = await plan.updateOne(req.body);
        } else {
            plan = await Plan.create(req.body);
            await MemorizerData
            .updateOne({ userId: userModel.id, }, 
                { $inc: { plansCount: 1 } });
        }
    }

    return res.status(200).json(plan);
});