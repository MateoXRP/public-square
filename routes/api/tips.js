const express = require('express');

// const appXrplAddress = require('../../config/keys').appXrplAddress;

const {
  appReturnURL,
  getTxAmount,
  sendPayload
} = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/tips
// @desc    tip post
// @access  Public
router.post('/', async (req, res) => {
  const { account, amount, currency, postId } = req.body;
  console.log('account: ', account);
  console.log('amount: ', amount);
  console.log('currency: ', currency);
  console.log('postId: ', postId);

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
        Destination: account,
        Amount: getTxAmount(currency, amount),
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
    // const data = await sendPayload(payloadConfig);

    // check result
    // console.log('payload data: ', data);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
