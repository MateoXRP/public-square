// Blacklisted tx check

// array of tx hashes
const blacklistedTransactions = require('../config/blacklisted-transactions');

// create Set from array of tx
const blacklist = new Set(blacklistedTransactions);

/**
 * @desc check if tx is on blacklist
 * @param {string} txHash
 * @return {boolean} isBlacklisted
 */
const isBlacklisted = txHash => blacklist.has(txHash);

module.exports = isBlacklisted;
