/**
 * @desc find tip tx by tx hash from account transactions
 * @param {array} records (tx)
 * @param {string} txHash (tx.hash)
 * @return {object} tipTx (tx)
 */
function findTipByTxHash(records, txHash) {
  const tipTx = records.filter(record => record.tx.hash === txHash);

  return tipTx.length > 0 ? tipTx[0] : undefined;
}

/**
 * @desc get tip data from xumm payload
 * @param {object} tipPayload
 * @return {object} tipData
 */
function getTipDataFromPayload(tipPayload) {
  const { payload, response } = tipPayload;
  const { request_json } = payload;
  const { Destination, Amount, Memos } = request_json;
  const { txid, resolved_at, account } = response;

  const tipData = {
    Account: account,
    Amount,
    Destination,
    date: resolved_at,
    hash: txid,
    Memos
  };

  return tipData;
}

module.exports = {
  findTipByTxHash,
  getTipDataFromPayload
};
