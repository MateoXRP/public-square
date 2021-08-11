const express = require('express');

const { appBaseUrl, appWalletAddress } = require('../../config/keys');

const { getAccountTx } = require('../../services/xrpl-client');
const { getTxAmount, sendPayload } = require('../../services/xumm');

const isBlacklisted = require('../../util/is-blacklisted');

const {
  getPost,
  getPostComments,
  getPostLikes,
  getPosts,
  getPostsByAccount,
  string2Hex
} = require('../../util/tx-data');

const router = express.Router();

// @route   GET api/posts
// @desc    Fetch posts data
// @access  Public
router.get('/', async (req, res) => {
  const cursor = Number.parseInt(req.query.cursor);

  try {
    const { transactions } = await getAccountTx();
    console.log('tx fetched');
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
    console.log('getPosts result');
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

    const { transactions } = await getAccountTx();

    if (!transactions) {
      return res.status(404).json({
        error: {
          ref: id,
          code: 404,
          message: 'Error retrieving transaction'
        }
      });
    }

    // get post
    const post = await getPost(transactions, id);

    if (!post) {
      return res.send({});
    }

    // get comments
    const comments = await getPostComments(transactions, id);

    // get likes
    const likes = await getPostLikes(transactions, id);

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
    const { transactions } = await getAccountTx();
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

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post('/', async (req, res) => {
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
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: appBaseUrl
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

module.exports = router;
