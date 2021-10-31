const { Post } = require('../models/Post');
const { Comment } = require('../models/Comment');

const { getUserId } = require('../controllers/users');
const { getAccountTxByMarker } = require('../services/xrpl-client');
const { findCommentByTxHash } = require('../util/comment');
const {
  getTimestamp,
  getTxAmountData,
  parseMemoData
} = require('../util/tx-data');

const getCommentTransaction = async txHash => {
  let targetTx = null;
  let marker = null;

  try {
    while (!targetTx) {
      const response = await getAccountTxByMarker(20, marker);

      // look for post in tx batch
      const target = findCommentByTxHash(response.transactions, txHash);

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

const saveCommentToDB = async data => {
  const { Account, Amount, date, hash, Memos } = data;

  try {
    const commentExists = await checkIfCommentTxExistsInDB(hash);
    if (commentExists) {
      return {};
    }

    const user = await getUserId(Account);

    // parse post hash and comment content from memos field
    const memoData = parseMemoData(Memos);
    const commentContent = memoData.substring(65);
    const postHash = memoData.substring(0, 64);
    console.log('postHash', postHash);
    const amountData = getTxAmountData(Amount);

    // content has post hash
    const post = await Post.findOne({ hash: postHash });

    if (!post) {
      const res = `Post not found, skipping...`;
      return res;
    }

    const commentData = {
      postId: post._id,
      postHash: postHash,
      user,
      userAccount: Account,
      amount: amountData,
      date: getTimestamp(date),
      hash,
      content: commentContent
    };

    // create new comment doc
    const newComment = new Comment(commentData);

    //  save comment to DB
    const comment = await newComment.save();

    post.comments.unshift(comment._id);

    await post.save();

    // return post hash for response and client redirect
    return { postHash: post.hash };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfCommentTxExistsInDB = async hash =>
  new Promise(async function (resolve, reject) {
    try {
      const result = await Comment.findOne({ hash });
      resolve(!!result);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getCommentTransaction,
  saveCommentToDB
};
