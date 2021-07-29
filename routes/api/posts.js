const express = require('express');

const appXrplAddress = require('../../config/keys').appXrplAddress;

const { getAccountTx } = require('../../services/xrpl-client');
const {
  appReturnURL,
  getTxAmount,
  sendPayload
} = require('../../services/xumm');

const { postTxOmitList } = require('../../util/special-tx-lists');
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

  // console.log('cursor: ', cursor);
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

    const result = await getPosts(transactions, cursor);
    // console.log('posts: ', result.posts.length);
    // console.log('nextCursor: ', result.nextCursor);

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
  // console.log('post ID: ', id);
  try {
    if (postTxOmitList.has(id)) {
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

  // console.log('cursor: ', cursor);
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
    // console.log('posts: ', result.posts.length);
    // console.log('nextCursor: ', result.nextCursor);

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
  // console.log('postContent: ', postContent);
  // console.log('currency: ', currency);
  console.log('userToken: ', userToken);

  try {
    // convert text to hex
    const postData = string2Hex(postContent);
    // console.log('postData: ', postData);

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
        Destination: appXrplAddress,
        DestinationTag: 99,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      options: {
        submit: true,
        expire: 1440,
        return_url: {
          web: appReturnURL
        }
      }
    };

    if (userToken) {
      payloadConfig.user_token = userToken;
    }

    console.log('payload config: ', payloadConfig);

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // check result
    console.log(`New post was created`);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
