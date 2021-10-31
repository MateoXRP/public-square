/**
 * @desc get comment transactions from account transactions
 * @param {array} records (tx)
 * @return {array} commentTx (tx)
 */
function commentTransactionsFilter(records) {
  const commentTransactions = records.filter(
    record =>
      (record.tx.TransactionType === 'Payment') &
      // Comment tx have DestinationTag: 100
      (record.tx.DestinationTag === 100)
  );

  return commentTransactions.length > 0 ? commentTransactions : undefined;
}

/**
 * @desc find comment tx by tx hash from account transactions
 * @param {array} records (tx)
 * @param {string} txHash (tx.hash)
 * @return {object} commentTx (tx)
 */
function findCommentByTxHash(records, txHash) {
  const comments = commentTransactionsFilter(records);

  if (!comments) return undefined;

  const commentTx = comments.filter(record => record.tx.hash === txHash);

  return commentTx.length > 0 ? commentTx[0] : undefined;
}

module.exports = {
  findCommentByTxHash
};
