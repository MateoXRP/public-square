const { Post } = require('../models/Post');
const { Tip } = require('../models/Tip');

const { getUserId } = require('../controllers/users');
const { getPayload } = require('../services/xumm');
const { getTipDataFromPayload } = require('../util/tip');
const { getTxAmountData, parseMemoData } = require('../util/tx-data');

const getTipTransaction = async payloadId => {
  try {
    const tipPayload = await getPayload(payloadId);
    if (tipPayload.response.dispatched_result !== 'tesSUCCESS') {
      return { tipFailed: true };
    }

    const tipData = getTipDataFromPayload(tipPayload);
    return tipData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const saveTipToDB = async data => {
  const { Account, Amount, Destination, date, hash, Memos } = data;
  try {
    const tipExists = await checkIfTipTxExistsInDB(hash);
    if (tipExists) {
      return 'tip exists, skipping...';
    }

    const donor = await getUserId(Account);

    const recipient = await getUserId(Destination);

    // parse post hash from memos field
    const postHash = parseMemoData(Memos);
    const amountData = getTxAmountData(Amount);

    // content has post hash
    const post = await Post.findOne({ hash: postHash });

    const tipData = {
      postId: post._id,
      postHash,
      donor,
      donorAccount: Account,
      recipient,
      recipientAccount: Destination,
      amount: amountData,
      date,
      hash
    };

    // create new comment doc
    const newTip = new Tip(tipData);

    //  save tip to DB
    const tip = await newTip.save();

    // save tip to post record
    post.tips.unshift(tip._id);

    await post.save();

    // return post or just postHash for response and client redirect?
    return { postHash: post.hash };
  } catch (error) {
    console.log(error);
    return error;
  }
};

const checkIfTipTxExistsInDB = async hash =>
  new Promise(async function (resolve, reject) {
    try {
      const result = await Tip.findOne({ hash });
      resolve(!!result);
    } catch (error) {
      reject(error);
    }
  });

module.exports = {
  getTipTransaction,
  saveTipToDB
};
