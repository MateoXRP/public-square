const getBithompUsername = require('../services/bithomp').getBithompUsername;
const getEmailHash = require('../services/xrpscan').getEmailHash;

// Convert memo data hex to string
function hex2String(hex) {
  // convert to string
  const hexString = hex.toString();
  // initialize result variable
  var result = '';

  // derive characters from hex string
  for (
    var i = 0;
    i < hexString.length && hexString.substr(i, 2) !== '00';
    i += 2
  ) {
    result += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
  }
  // console.log('result: ', result);
  return result;
}

// get post transactions from account transactions
function allPostsFilter(records) {
  const postTx = records.filter(
    record =>
      (record.tx.TransactionType === 'Payment') &
      (record.tx.DestinationTag === undefined) &
      (record.tx.Memos !== undefined) &
      (record.tx.hash !==
        'C5BA9EE5A16D990E9A5FC7017267A19496C6605471B456AC1C67E1DE1BB26C3A')
  );

  return postTx;
}

// find post tx by id from account transactions
function postByIdFilter(records, id) {
  const postTx = records.filter(record => record.tx.hash === id);

  return postTx;
}

// parse memos field and get memo data
function parseMemoData(txMemos) {
  const memoData = txMemos[0].Memo.MemoData;

  const parsedMemo = hex2String(memoData);
  // console.log('parsed memo data: ', parsedMemo);

  return parsedMemo;
}

// convert date field
function getTimestamp(date) {
  const unixDate = date + 946684800;
  const timestamp = new Date(unixDate * 1000);
  // console.log('timestamp: ', timestamp);
  return timestamp;
}

// derive post data from transaction
async function getPostData({ Account, Amount, date, hash, Memos }) {
  try {
    // get username
    const username = await getBithompUsername(Account);

    // generate Gravatar URL
    const emailHash = await getEmailHash(Account);
    // console.log('email hash: ', emailHash);

    const gravatarURL = `https://www.gravatar.com/avatar/${
      emailHash ? emailHash : Account
    }?d=retro`;
    // console.log('gravatar: ', gravatarURL);

    // determine display amount
    const amount = Amount.currency
      ? `${Amount.value} ${Amount.currency}`
      : `${parseInt(Amount) / 1000000} XRP`;

    // post data object
    const data = {
      account: Account,
      amount,
      date: getTimestamp(date),
      gravatarURL,
      hash,
      memoData: parseMemoData(Memos),
      username
    };

    // console.log('post data: ', data);
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}

module.exports = {
  hex2String,
  allPostsFilter,
  postByIdFilter,
  parseMemoData,
  getTimestamp,
  getPostData
};
