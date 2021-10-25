const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const {
  getAccountTxByLimit,
  getAccountTxByMarker
} = require('../../services/xrpl-client');
const { getTxAmount, sendPayload } = require('../../services/xumm');
const { getTransaction } = require('../../services/bithomp');

const isBlacklisted = require('../../util/is-blacklisted');

const {
  getPostComments,
  getPostData,
  getPostLikes,
  getPosts,
  getPostsByAccount,
  postByIdFilter,
  string2Hex
} = require('../../util/tx-data');

const { getPostTransaction, savePostToDB } = require('../../controllers/posts');

const router = express.Router();

// @route   GET api/posts
// @desc    Fetch posts data
// @access  Public
router.get('/', async (req, res) => {
  const cursor = Number.parseInt(req.query.cursor);

  try {
    const { transactions } = await getAccountTxByLimit(5000);

    if (!transactions) {
      return res.status(404).json({
        error: {
          ref: id,
          code: 404,
          message: 'Error retrieving transactions'
        }
      });
    }

    const result = await getPosts(transactions, cursor);

    const response = { data: result.posts };

    if (result.nextCursor) {
      response.nextCursor = result.nextCursor;
    }

    res.send(response);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/posts/:id
// @desc    Fetch post data
// @access  Public
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const records = [];
  let targetTx = null;
  let marker = null;

  try {
    if (isBlacklisted(id)) {
      return res.status(404).json({
        error: {
          ref: id,
          code: 404,
          message: 'Post not found'
        }
      });
    }

    while (!targetTx) {
      const response = await getAccountTxByMarker(1000, marker);

      if (!response.transactions) {
        return res.send({});
      }

      records.push(...response.transactions);

      // look for post
      const target = postByIdFilter(response.transactions, id);
      // if found end loop
      if (target) {
        targetTx = target;
      }

      marker = response.marker;
    }

    // get post data
    const post = await getPostData(targetTx.tx);

    if (!post) {
      return res.send({});
    }

    // get comments
    const comments = await getPostComments(records, id);

    // get likes
    const likes = await getPostLikes(records, id);

    res.send({ post, comments, likes });
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
    const { transactions } = await getAccountTxByLimit(15000);
    if (!transactions) {
      return res.status(404).json({
        error: {
          ref: id,
          code: 404,
          message: 'Error retrieving transactions'
        }
      });
    }

    const result = await getPostsByAccount(transactions, account, cursor);

    const response = { data: result.posts };

    if (result.nextCursor) {
      response.nextCursor = result.nextCursor;
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
