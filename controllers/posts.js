const { Post } = require('../models/Post');

const { getUserId } = require('../controllers/users');
const { getAccountTxByMarker } = require('../services/xrpl-client');
const { findPostByTxHash } = require('../util/post');
const {
  getTimestamp,
  getTxAmountData,
  parseMemoData
} = require('../util/tx-data');

const getPostTransaction = async txHash => {
  let targetTx = null;
  let marker = null;

  try {
    while (!targetTx) {
      const response = await getAccountTxByMarker(20, marker);

      // look for post in tx batch
      const target = findPostByTxHash(response.transactions, txHash);

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

const savePostToDB = async data => {
  const { Account, Amount, date, hash, Memos } = data;

  try {
    const user = await getUserId(Account);

    const postContent = parseMemoData(Memos);

    const amountData = getTxAmountData(Amount);

    const postData = {
      author: user,
      amount: amountData,
      date: getTimestamp(date),
      hash,
      content: postContent
    };

    // create new Post doc
    const newPost = new Post(postData);

    //  save post to DB
    const post = await newPost.save();

    // return post hash for response and client redirect
    return { postHash: post.hash };
  } catch (error) {
    console.log(error);
    return error;
  }
};

// fetch posts batch

// fetch post

module.exports = {
  getPostTransaction,
  savePostToDB
};
