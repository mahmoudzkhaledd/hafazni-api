const appRoute = require('express').Router();
const { addUpdatePlan } = require('./Service/AddUpdatePlan');
const { getUserPlans } = require('./Service/GetMemorizerPlan');
appRoute.route('/').post(addUpdatePlan);
appRoute.route('/user/:id').get(getUserPlans);
module.exports = appRoute;