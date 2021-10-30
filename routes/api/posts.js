const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getTxAmount, sendPayload } = require('../../services/xumm');

const { string2Hex } = require('../../util/tx-data');

const {
  getPostTransaction,
  savePostToDB,
  getPosts,
  getPostById,
  getPostByHash,
  getPostsByAccount,
  getNextCursor,
  getAccountNextCursor
} = require('../../controllers/posts');

const router = express.Router();

// @route   GET api/posts
// @desc    Fetch posts data
// @access  Public
router.get('/', async (req, res) => {
  const cursor = Number.parseInt(req.query.cursor);
  console.log('cursor', cursor);
  try {
    const result = await getPosts(cursor);
    const response = { data: result };
    const nextCursor = await getNextCursor(cursor);
    if (nextCursor) {
      response.nextCursor = nextCursor;
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/posts/tx/:txHash
// @desc    Fetch post data
// @access  Public
router.get('/tx/:txHash', async (req, res) => {
  const { txHash } = req.params;
  try {
    // get post data
    const result = await getPostByHash(txHash);

    const response = { post: result };

    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/posts/id/:id
// @desc    Fetch post data
// @access  Public
router.get('/id/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // get post data
    const result = await getPostById(id);
    console.log('result: ', result);

    const response = { data: result.post };

    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/posts/account/:account
// @desc    Fetch posts by user account
// @access  Public
router.get('/account/:account', async (req, res) => {
  const { account } = req.params;
  const cursor = Number.parseInt(req.query.cursor);

  try {
    const result = await getPostsByAccount(account, cursor);

    const response = { data: result };

    const nextCursor = await getAccountNextCursor(account, cursor);
    if (nextCursor) {
      response.nextCursor = nextCursor;
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   POST api/posts/tx
// @desc    Submit post tx
// @access  Public
router.post('/tx', async (req, res) => {
  const { postContent, currency, userToken } = req.body;

  try {
    // convert text to hex
    const postData = string2Hex(postContent).toUpperCase();

    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: postData
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: appWalletAddress,
        DestinationTag: 99,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      custom_meta: {
        identifier: `posts`
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
    console.log(`new post submitted`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   POST api/posts
// @desc    Create post record
// @access  Public
router.post('/', async (req, res) => {
  const { txHash } = req.body;
  try {
    // get post data
    const post = await getPostTransaction(txHash);

    // create/save post
    const { postHash } = await savePostToDB(post.tx);

    // return post hash for redirect
    res.json({ postHash });
  } catch (error) {
    console.error(error);
    res.json({});
  }
});

module.exports = router;
