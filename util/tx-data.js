const md5 = require('@xn-02f/md5');
const getBithompUsername = require('../services/bithomp').getBithompUsername;
const getXRPEmailHash = require('../services/xrpscan').getXRPEmailHash;

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
    const xrpEmailHash = await getXRPEmailHash(Account);

    const emailHash = xrpEmailHash ? xrpEmailHash.toLowerCase() : md5(Account);

    const gravatarURL = `https://www.gravatar.com/avatar/${emailHash}?s=40&d=retro`;
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

  return postTx[0];
}

// find comments on post from account transactions
function commentsByPostIdFilter(records, id) {
  const commentTx = records.filter(record => {
    if (record.tx.DestinationTag !== 100 || !record.tx.Memos) return false;

    // Parse memo data
    const memoData = parseMemoData(record.tx.Memos);

    // filter out defective comments w/o post ID
    if (memoData.length < 64) return false;

    // Get post ID
    const postId = memoData.substring(0, 64);
    // console.log('postId: ', postId);
    // Compare
    return postId === id;
  });

  return commentTx;
}

// find likes on post from account transactions
function likesByPostIdFilter(records, id) {
  const likeTx = records.filter(record => {
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

async function getPosts(records) {
  const postTx = allPostsFilter(records);

  // get posts data
  const postsData = await postTx.map(async record => {
    const data = await getPostData(record.tx);
    // console.log('data: ', data);
    return data;
  });

  return Promise.all(postsData).then(posts => {
    // console.log('posts: ', posts);
    return posts;
  });
}

async function getPost(records, id) {
  const postTx = await postByIdFilter(records, id);

  // get post data
  const post = await getPostData(postTx.tx);

  return post;
}

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
    // console.log('comments: ', comments);
    return comments;
  });
}

async function getPostLikes(records, id) {
  const likeTx = await likesByPostIdFilter(records, id);
  const likesData = await likeTx.map(async record => {
    const data = await getPostData(record.tx);

    return data;
  });

  return Promise.all(likesData).then(likes => {
    // console.log('likes: ', likes);
    return likes;
  });
}

module.exports = {
  hex2String,
  parseMemoData,
  getTimestamp,
  getPostData,
  allPostsFilter,
  postByIdFilter,
  commentsByPostIdFilter,
  likesByPostIdFilter,
  getPosts,
  getPost,
  getPostComments,
  getPostLikes
};
