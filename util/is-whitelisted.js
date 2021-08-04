const whitelistedTransactions = require('../config/whitelisted-transactions');

const whitelist = new Set(whitelistedTransactions);

const isWhitelisted = txHash => whitelist.has(txHash);

module.exports = isWhitelisted;
