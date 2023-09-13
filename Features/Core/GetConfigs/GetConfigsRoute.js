const appRoute = require('express').Router();
const appConfigs = require('../../../ServerConfigs/ServerConfigs.json');
appRoute.get('/app-configs', (req, res, next) => {
    res.status(200).json(appConfigs);
});

module.exports = appRoute;