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
  getPosts,
  getPost,
  getPostComments,
  getPostLikes,
  string2Hex
} = require('../../util/tx-data');

const router = express.Router();

// @route   GET api/posts
// @desc    Fetch posts data
// @access  Public
router.get('/', async (req, res) => {
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

    const posts = await getPosts(transactions);
    // console.log('posts: ', posts);

    // const data = { posts };
    res.send({ posts });
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

// @route   POST api/posts
// @desc    Create post
// @access  Public
router.post('/', async (req, res) => {
  const { postContent, currency } = req.body;
  // console.log('postContent: ', postContent);
  // console.log('currency: ', currency);

  try {
    // convert text to hex
    const postData = string2Hex(postContent);
    console.log('postData: ', postData);

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

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // check result
    console.log('payload data: ', data);

    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
