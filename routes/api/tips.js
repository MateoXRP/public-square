const express = require('express');

const { appBaseUrl } = require('../../config/app-config');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/tips
// @desc    tip post
// @access  Public
router.post('/', async (req, res) => {
  const { amount, currency, postId, recipientAccount, userToken } = req.body;

  try {
    const tipData = string2Hex(postId);

    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: tipData
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: recipientAccount,
        Amount: getTxAmount(currency, amount),
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

    // log result
    console.log(`tip for post ${postId} submitted`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
