// array of tx hashes
const whitelistedTransactions = require('../config/whitelisted-transactions');

// create Set from array of tx
const whitelist = new Set(whitelistedTransactions);

// fn to check if tx is in list
const isWhitelisted = txHash => whitelist.has(txHash);

module.exports = isWhitelisted;
