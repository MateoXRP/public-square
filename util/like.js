/**
 * @desc get like transactions from account transactions
 * @param {array} records (tx)
 * @return {array} likeTx (tx)
 */
function likeTransactionsFilter(records) {
  const likeTransactions = records.filter(
    record =>
      (record.tx.TransactionType === 'Payment') &
      // like tx have DestinationTag: 101
      (record.tx.DestinationTag === 101)
  );

  return likeTransactions.length > 0 ? likeTransactions : undefined;
}

/**
 * @desc find like tx by tx hash from account transactions
 * @param {array} records (tx)
 * @param {string} txHash (tx.hash)
 * @return {object} likeTx (tx)
 */
function findLikeByTxHash(records, txHash) {
  const likes = likeTransactionsFilter(records);

  if (!likes) return undefined;

  const likeTx = likes.filter(record => record.tx.hash === txHash);

  return likeTx.length > 0 ? likeTx[0] : undefined;
}

module.exports = {
  findLikeByTxHash
};
