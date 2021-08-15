const md5 = require('@xn-02f/md5');
const getBithompUsername = require('../services/bithomp').getBithompUsername;
const getXRPEmailHash = require('../services/xrpscan').getXRPEmailHash;

const isBlacklisted = require('./is-blacklisted');
const isWhitelisted = require('./is-whitelisted');

/**
 * @desc convert hex to string
 * @param {hex} hex
 * @return {string} result
 */
function hex2String(hex) {
  // convert hex into buffer
  const bufHex = Buffer.from(hex, 'hex');

  // convert buffer to utf8 string
  const string = bufHex.toString();

  return string;
}

/**
 * @desc convert string to hex using Buffer
 * @param {string} str
 * @return {hex string} hexString
 */
function string2Hex(str) {
  // convert string into buffer
  let bufStr = Buffer.from(str, 'utf8');

  // convert buffer to hex string
  const hexString = bufStr.toString('hex');

  return hexString;
}

/**
 * @desc parse memos field and get memo data
 * @param {hex} txMemos
 * @return {string} parsedMemo
 */
function parseMemoData(txMemos) {
  const memoData = txMemos[0].Memo.MemoData;

  const parsedMemo = hex2String(memoData);

  return parsedMemo;
}

/**
 * @desc convert date field to timestamp
 * @param {UNIX date} date
 * @return {Date} timestamp
 */
function getTimestamp(date) {
  const unixDate = date + 946684800;
  const timestamp = new Date(unixDate * 1000);

  return timestamp;
}

/**
 * @desc derive post data from transaction
 * @param {string} Account XRP account/address
 * @param {string} Amount tx amount
 * @param {string} date tx date
 * @param {string} hash tx hash
 * @param {string} Memos tx Memos field
 * @return {object} data: {account, amount, date, gravatarURL, hash, memoData, username}
 */
async function getPostData({ Account, Amount, date, hash, Memos }) {
  try {
    // get username
    const username = await getBithompUsername(Account);

    // generate Gravatar URL
    const xrpEmailHash = await getXRPEmailHash(Account);

    const emailHash = xrpEmailHash ? xrpEmailHash.toLowerCase() : md5(Account);
    const gravatarURL = `https://www.gravatar.com/avatar/${emailHash}?s=40&d=retro`;

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

    return data;
  } catch (error) {
    console.log('error: ', error);
  }
}

/**
 * @desc get user info from account/address
 * @param {string} account
 * @return {object} userInfo: {account, gravatarURL, username}
 */
async function getUserInfo(account) {
  try {
    // get username
    const username = await getBithompUsername(account);

    // generate Gravatar URL
    const xrpEmailHash = await getXRPEmailHash(account);

    const emailHash = xrpEmailHash ? xrpEmailHash.toLowerCase() : md5(account);

    const gravatarURL = `https://www.gravatar.com/avatar/${emailHash}?s=24&d=retro`;

    // post data object
    const userInfo = {
      account,
      gravatarURL,
      username
    };

    return userInfo;
  } catch (error) {
    console.log('error: ', error);
  }
}

/**
 * @desc get all post transactions from account transactions
 * @param {array} records (tx)
 * @return {array} postTx (tx)
 */
function allPostsFilter(records) {
  const postTx = records.filter(
    record =>
      (record.tx.TransactionType === 'Payment') &
      // Posts have DestinationTag: 99
      (record.tx.DestinationTag === 99 || isWhitelisted(record.tx.hash)) &
      (record.tx.Memos !== undefined) &
      !isBlacklisted(record.tx.hash)
  );

  return postTx;
}

/**
 * @desc get post transactions by account from account transactions
 * @param {array} records (tx)
 * @param {string} account
 * @return {array} postTx (tx)
 */
function postsByAccountFilter(records, account) {
  const postTx = records.filter(
    record =>
      (record.tx.Account === account) &
      (record.tx.TransactionType === 'Payment') &
      // Post tx have DestinationTag: 99
      (record.tx.DestinationTag === 99 || isWhitelisted(record.tx.hash)) &
      (record.tx.Memos !== undefined) &
      !isBlacklisted(record.tx.hash)
  );

  return postTx;
}

/**
 * @desc find post tx by id from account transactions
 * @param {array} records (tx)
 * @param {string} id (tx.hash)
 * @return {object} postTx (tx)
 */
function postByIdFilter(records, id) {
  const postTx = records.filter(record => record.tx.hash === id);

  return postTx[0];
}

/**
 * @desc find comments on post from account transactions
 * @param {array} records (tx)
 * @param {string} id (post tx.hash)
 * @return {array} commentTx (tx)
 */
function commentsByPostIdFilter(records, id) {
  const commentTx = records.filter(record => {
    // Comment tx have DestinationTag: 100
    if (
      isBlacklisted(record.tx.hash) ||
      record.tx.DestinationTag !== 100 ||
      !record.tx.Memos
    )
      return false;

    // Parse memo data
    const memoData = parseMemoData(record.tx.Memos);

    // filter out defective comments w/o post ID
    if (memoData.length < 64) return false;

    // Get post ID
    const postId = memoData.substring(0, 64);
    // Compare
    return postId === id;
  });

  return commentTx;
}

/**
 * @desc find likes on post from account transactions
 * @param {array} records (tx)
 * @param {string} id (post tx.hash)
 * @return {array} likeTx (tx)
 */
function likesByPostIdFilter(records, id) {
  const likeTx = records.filter(record => {
    // Like tx have DestinationTag: 101
    if (record.tx.DestinationTag !== 101 || !record.tx.Memos) return false;

    // Parse memo data
    const memoData = parseMemoData(record.tx.Memos);

    // Get post ID
    const postId = memoData.substring(0, 64);

    // Compare
    return postId === id;
  });

  return likeTx;
}

/**
 * @desc get posts from account transactions
 * @param {array} records (tx)
 * @param {number} cursor (for paginated results)
 * @return {array} posts
 */
async function getPosts(records, cursor) {
  const postTx = allPostsFilter(records);

  const lastPostIdx = postTx.length - 1;
  const nextCursorIdx = cursor + 4;

  const result = {
    nextCursor: lastPostIdx >= nextCursorIdx ? nextCursorIdx : null
  };

  // get next 4 posts starting with cursor index
  const postsBatch = postTx.slice(cursor, nextCursorIdx);

  // get posts data
  const postsData = await postsBatch.map(async record => {
    const data = await getPostData(record.tx);

    return data;
  });

  return Promise.all(postsData).then(posts => {
    result.posts = posts;

    return result;
  });
}

/**
 * @desc get posts by account from account transactions
 * @param {array} records (tx)
 * @param {string} account
 * @param {number} cursor (for paginated results)
 * @return {array} posts
 */
async function getPostsByAccount(records, account, cursor) {
  const postTx = postsByAccountFilter(records, account);

  const lastPostIdx = postTx.length - 1;
  const nextCursorIdx = cursor + 4;
  const result = {
    nextCursor: lastPostIdx >= nextCursorIdx ? nextCursorIdx : null
  };

  // get next 4 posts starting with cursor index
  const postsBatch = postTx.slice(cursor, nextCursorIdx);

  // get posts data
  const postsData = await postsBatch.map(async record => {
    const data = await getPostData(record.tx);

    return data;
  });

  return Promise.all(postsData).then(posts => {
    result.posts = posts;

    return result;
  });
}

/**
 * @desc get post by id/tx from account transactions
 * @param {array} records (tx)
 * @param {string} id
 * @return {object} post
 */
async function getPost(records, id) {
  try {
    const postTx = await postByIdFilter(records, id);

    if (!postTx) {
      return null;
    }

    // get post data
    const post = await getPostData(postTx.tx);

    return post;
  } catch (error) {
    console.log('catch error: ', error);
    return error;
  }
}

/**
 * @desc get post comments by id/tx from account transactions
 * @param {array} records (tx)
 * @param {string} id
 * @return {array} comments
 */
async function getPostComments(records, id) {
  const commentTx = await commentsByPostIdFilter(records, id);
  const commentsData = await commentTx.map(async record => {
    const data = await getPostData(record.tx);

    // remove post ids from memoData
    const commentText = data.memoData.substring(65);
    data.memoData = commentText;
    return data;
  });

  return Promise.all(commentsData).then(comments => {
    return comments;
  });
}

/**
 * @desc get post likes by id/tx from account transactions
 * @param {array} records (tx)
 * @param {string} id
 * @return {array} likes
 */
async function getPostLikes(records, id) {
  const likeTx = await likesByPostIdFilter(records, id);
  const likesData = await likeTx.map(async record => {
    const data = await getPostData(record.tx);

    return data;
  });

  return Promise.all(likesData).then(likes => {
    return likes;
  });
}

module.exports = {
  hex2String,
  string2Hex,
  parseMemoData,
  getTimestamp,
  getPostData,
  getUserInfo,
  allPostsFilter,
  postByIdFilter,
  commentsByPostIdFilter,
  likesByPostIdFilter,
  getPosts,
  getPostsByAccount,
  getPost,
  getPostComments,
  getPostLikes
};
