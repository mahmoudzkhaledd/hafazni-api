const appRoute = require('express').Router();
const { loadUserById } = require('./GetUserService/GetUserByIdService')
appRoute.get('/:id', loadUserById);

module.exports = appRoute;