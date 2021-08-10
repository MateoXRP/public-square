// Whitelisted tx check

// array of tx hashes
const whitelistedTransactions = require('../config/whitelisted-transactions');

// create Set from array of tx
const whitelist = new Set(whitelistedTransactions);

/**
 * @desc check if tx is on whitelis
 * @param {string} txHash
 * @return {boolean} isWhitelisted
 */
const isWhitelisted = txHash => whitelist.has(txHash);

module.exports = isWhitelisted;
