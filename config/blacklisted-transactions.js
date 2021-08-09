// Transaction blacklist
// tx hashes of transactions that are explicitly excluded from results
// because violate TOS or unrelated to app
// If cloning repo: delete these transactions and set to empty array
// const blackListedTransactions = [];

const blacklistedTransactions = [
  'C5BA9EE5A16D990E9A5FC7017267A19496C6605471B456AC1C67E1DE1BB26C3A'
  // To add a transaction to blacklist
  // Add comma after last transaction hash
  // Add transaction hash of tx to exclude (inside quotes)
];

module.exports = blacklistedTransactions;
