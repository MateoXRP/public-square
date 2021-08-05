const blacklistedTransactions = require('../config/blacklisted-transactions');

const blacklist = new Set(blacklistedTransactions);

const isBlacklisted = txHash => blacklist.has(txHash);

module.exports = isBlacklisted;
