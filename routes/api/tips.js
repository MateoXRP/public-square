const express = require('express');

const { appBaseUrl } = require('../../config/app-config');

const { getTxAmount, sendPayload } = require('../../services/xumm');
const { getTipTransaction, saveTipToDB } = require('../../controllers/tips');
const { string2Hex } = require('../../util/tx-data');

const router = express.Router();

// @route   POST api/tips/tx
// @desc    tip post
// @access  Public
router.post('/tx', async (req, res) => {
  const { amount, currency, postHash, recipientAccount, userToken } = req.body;

  try {
    const tipData = string2Hex(postHash);

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
      custom_meta: {
        identifier: `tips`
      },
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: `${appBaseUrl}/tip?identifier={cid}&payload={id}`
        }
      }
    };

    if (userToken) {
      payloadConfig.user_token = userToken;
    }

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // log result
    console.log(`tip for post ${postHash} submitted`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   POST api/tips
// @desc    Create tip record
// @access  Public
router.post('/', async (req, res) => {
  const { payloadId } = req.body;
  try {
    // get tip data
    const tipData = await getTipTransaction(payloadId);

    if (tipData.tipFailed) {
      res.json({});
    }

    // create/save tip
    const { postHash } = await saveTipToDB(tipData);

    // return target post hash for redirect
    res.json({ postHash });
  } catch (error) {
    console.error(error);
    res.json({});
  }
});

module.exports = router;
