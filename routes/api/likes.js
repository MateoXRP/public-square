const express = require('express');

const appXrplAddress = require('../../config/keys').appXrplAddress;

const {
  appReturnURL,
  getTxAmount,
  sendPayload
} = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/likes
// @desc    Like post
// @access  Public
router.post('/', async (req, res) => {
  const { currency, postId } = req.body;
  // console.log('postId: ', postId);
  // console.log('currency: ', currency);
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
        Destination: appXrplAddress,
        DestinationTag: 101,
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

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // check result
    // console.log('payload data: ', data);
    console.log(`post ${postId} was liked`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
