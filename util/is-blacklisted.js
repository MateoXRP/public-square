// array of tx hashes
const blacklistedTransactions = require('../config/blacklisted-transactions');

// create Set from array of tx
const blacklist = new Set(blacklistedTransactions);

// fn to check if tx is in list
const isBlacklisted = txHash => blacklist.has(txHash);

module.exports = isBlacklisted;
