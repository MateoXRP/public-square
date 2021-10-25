const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { getTransaction } = require('../../services/bithomp');
const { string2Hex } = require('../../util/tx-data');
const {
  getCommentTransaction,
  saveCommentToDB
} = require('../../controllers/comments');

const router = express.Router();

// @route   POST api/comments/tx
// @desc    Create comment to post
// @access  Public
router.post('/tx', async (req, res) => {
  const { commentContent, currency, postHash, userToken } = req.body;

  try {
    const commentData = string2Hex(
      `${postHash} ${commentContent}`
    ).toUpperCase();

    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: commentData
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: appWalletAddress,
        DestinationTag: 100,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      custom_meta: {
        identifier: `comments`
      },
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: `${appBaseUrl}/processing?identifier={cid}&hash={txid}`
        }
      }
    };

    if (userToken) {
      payloadConfig.user_token = userToken;
    }

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // log activity
    console.log(`comment submitted on post ${postHash}`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   POST api/comments
// @desc    Create comment record
// @access  Public
router.post('/', async (req, res) => {
  const { txHash } = req.body;
  try {
    // get comment data
    const comment = await getCommentTransaction(txHash);

    // create/save comment
    const { postHash } = await saveCommentToDB(comment.tx);

    // return target post hash for redirect
    res.json({ postHash });
  } catch (error) {
    console.error(error);
    res.json({});
  }
});

module.exports = router;
