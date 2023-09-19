const asyncHandeler = require('express-async-handler');
const Plan = require('../../../../Models/Plan');

exports.getUserPlans = asyncHandeler(async (req, res, next) => {
    const userId = req.params.id;
    const userModel = res.locals.userModel;
    let plans;
    
    if (userModel.id == userId) {
        plans = await Plan.find(userId != "all" ? 
        { memorizerFrom: userId } : {});
    } else {
        plans = await Plan.find(userId != "all" ? 
        { memorizerFrom: userId,state:'accepted' } : 
        {state:'accepted'})
            .populate('memorizerFrom', {
                _id: 1, 
                firstName: 1, 
                lastName: 1, 
                profilePic: 1, 
                country: 1,
            });
    }

    res.status(200).json(plans);
});