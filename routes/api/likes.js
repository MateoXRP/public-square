const express = require('express');
const { v4: uuidv4 } = require('uuid');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');
const { getLikeTransaction, saveLikeToDB } = require('../../controllers/likes');

const router = express.Router();

// @route   POST api/likes/tx
// @desc    Like post
// @access  Public
router.post('/tx', async (req, res) => {
  const { currency, postHash, userToken } = req.body;

  try {
    const likeData = string2Hex(postHash);

    // generate cid
    const identifierStr = uuidv4().slice(9);

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
      custom_meta: {
        identifier: `likes-${identifierStr}`
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
    console.log(`like tx submitted on post ${postHash}`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   POST api/likes
// @desc    Create like record
// @access  Public
router.post('/', async (req, res) => {
  const { txHash } = req.body;
  try {
    // get like data
    const like = await getLikeTransaction(txHash);

    // create/save like
    const { postHash } = await saveLikeToDB(like.tx);

    // return target post hash for redirect
    res.json({ postHash });
  } catch (error) {
    console.error(error);
    res.json({});
  }
});

module.exports = router;
