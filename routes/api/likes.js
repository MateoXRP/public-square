const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/likes
// @desc    Like post
// @access  Public
router.post('/', async (req, res) => {
  const { currency, postId, userToken } = req.body;

  try {
    const likeData = string2Hex(postId);

    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: likeData
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: appWalletAddress,
        DestinationTag: 101,
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
    console.log(`like submitted on post ${postId}`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
