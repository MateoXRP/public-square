/**
 * @desc get post transactions from account transactions
 * @param {array} records (tx)
 * @return {array} postTx (tx)
 */
function postTransactionsFilter(records) {
  const postTransactions = records.filter(
    record =>
      (record.tx.TransactionType === 'Payment') &
      // Posts have DestinationTag: 99
      (record.tx.DestinationTag === 99)
  );

  return postTransactions.length > 0 ? postTransactions : undefined;
}

/**
 * @desc find post tx by tx hash from account transactions
 * @param {array} records (tx)
 * @param {string} txHash (tx.hash)
 * @return {object} postTx (tx)
 */
function findPostByTxHash(records, txHash) {
  const posts = postTransactionsFilter(records);

  if (!posts) return undefined;

  const postTx = posts.filter(record => record.tx.hash === txHash);

  return postTx.length > 0 ? postTx[0] : undefined;
}

module.exports = {
  findPostByTxHash
};
