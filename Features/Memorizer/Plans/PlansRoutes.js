const appRoute = require('express').Router();
const { addUpdatePlan } = require('./Service/AddUpdatePlan');
const { getUserPlans } = require('./Service/GetMemorizerPlan');
const { getPlan } = require('./Service/GetPlan');
const { hidePlan} = require('./Service/HidePlan');

appRoute.route('/').post(addUpdatePlan);
appRoute.route('/:id').get(getPlan).delete(hidePlan);
appRoute.route('/user/:id').get(getUserPlans);
module.exports = appRoute;