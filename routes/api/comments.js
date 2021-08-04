const express = require('express');

const appXrplAddress = require('../../config/keys').appXrplAddress;

const {
  appReturnURL,
  getTxAmount,
  sendPayload
} = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/comments
// @desc    Create comment to post
// @access  Public
router.post('/', async (req, res) => {
  const { commentContent, currency, postId, userToken } = req.body;
  // console.log('userToken: ', userToken);

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
        Destination: appXrplAddress,
        DestinationTag: 100,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: `${appReturnURL}/p/${postId}`
        }
      }
    };

    if (userToken) {
      payloadConfig.user_token = userToken;
    }

    // console.log('payload config: ', payloadConfig);

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // check result
    // console.log('payload data: ', data);
    console.log(`comment posted to post ${postId}`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
