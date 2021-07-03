// Transaction Omit List(s)
// Listed transaction hashes to be omitted from results

// Tx to omit from all results
// Add tx hash strings to array
const txToOmit = [''];

const txOmitList = new Set(txToOmit);

// Post tx to omit
const postTxToOmit = [
  'C5BA9EE5A16D990E9A5FC7017267A19496C6605471B456AC1C67E1DE1BB26C3A'
];

const postTxOmitList = new Set(postTxToOmit);

module.exports = { txOmitList, postTxOmitList };
