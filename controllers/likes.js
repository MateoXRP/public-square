const { Post } = require('../models/Post');
const { Like } = require('../models/Like');

const { getUserId } = require('../controllers/users');
const { getAccountTxByMarker } = require('../services/xrpl-client');
const { findLikeByTxHash } = require('../util/like');
const {
  getTimestamp,
  getTxAmountData,
  parseMemoData
} = require('../util/tx-data');

const getLikeTransaction = async txHash => {
  let targetTx = null;
  let marker = null;

  try {
    while (!targetTx) {
      const response = await getAccountTxByMarker(20, marker);

      // look for post in tx batch
      const target = findLikeByTxHash(response.transactions, txHash);

      // if found end loop
      if (target) {
        targetTx = target;
      }

      marker = response.marker;
    }

    return targetTx;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const saveLikeToDB = async data => {
  const { Account, Amount, date, hash, Memos } = data;

  const user = await getUserId(Account);

  // parse post hash from memos field
  const postHash = parseMemoData(Memos);
  console.log('postHash', postHash);
  const amountData = getTxAmountData(Amount);

  // content has post hash
  const post = await Post.findOne({ hash: postHash });

  if (!post) {
    const res = `Post not found, skipping...`;
    return res;
  }

  const likeData = {
    postId: post._id,
    postHash: post.hash,
    user,
    userAccount: Account,
    amount: amountData,
    date: getTimestamp(date),
    hash
  };

  // create new comment doc
  const newLike = new Like(likeData);

  //  save like to DB
  const like = await newLike.save();

  // save like to post record
  post.likes.unshift(like._id);

  await post.save();

  // return post hash for response and client redirect
  return { postHash: post.hash };
};

module.exports = {
  getLikeTransaction,
  saveLikeToDB
};
