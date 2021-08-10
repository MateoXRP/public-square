const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/comments
// @desc    Create comment to post
// @access  Public
router.post('/', async (req, res) => {
  const { commentContent, currency, postId, userToken } = req.body;

  try {
    const commentData = string2Hex(`${postId} ${commentContent}`).toUpperCase();

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
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: `${appBaseUrl}/p/${postId}`
        }
      }
    };

    if (userToken) {
      payloadConfig.user_token = userToken;
    }

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // log activity
    console.log(`comment submitted on post ${postId}`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
