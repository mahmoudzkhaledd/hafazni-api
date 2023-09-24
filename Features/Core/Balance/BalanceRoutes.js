const appRoute = require('express').Router();
// => /wallet
const { getWallet } = require('./Service/GetWallet');
const { chargeBalance } = require('./Service/ChargeBalance');
const { createWallet } = require('./Service/CreateWallet');
const { getTransactions } = require('./Service/GetTransactions');

const { transactionsMiddleware } = require('../../../middlewares/TransactionMiddleware');

appRoute.get('/', getWallet);
appRoute.get('/transactions', getTransactions);
appRoute.post('/charge', chargeBalance, transactionsMiddleware);
appRoute.post('/create', createWallet);

module.exports = appRoute;