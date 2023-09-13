const appRouter = require('express').Router();
const { searchMemroizer } = require('./Service/SearchMemrozerService');

appRouter.get('/', searchMemroizer);
module.exports = appRouter;