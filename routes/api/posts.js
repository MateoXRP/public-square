const express = require('express');

const appXrplAddress = require('../../config/keys').appXrplAddress;

const { getAccountTx } = require('../../services/xrpl-client');
const {
  appReturnURL,
  getTxAmount,
  sendPayload
} = require('../../services/xumm');

const {
  getPosts,
  getPost,
  getPostComments,
  getPostLikes
} = require('../../util/tx-data');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Test route
// @access  Public
router.get('/test', (req, res) => {
  try {
    res.send({ data: 'Posts route test response' });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

// @route   GET api/posts
// @desc    Fetch posts data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { transactions } = await getAccountTx();

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
    const { transactions } = await getAccountTx();

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
  console.log('postContent: ', postContent);
  console.log('currency: ', currency);

  try {
    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: postContent
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: appXrplAddress,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      options: {
        submit: false,
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

// @route   POST api/posts/comment
// @desc    Create comment to post
// @access  Public
router.post('/comment', async (req, res) => {
  const { commentContent, currency, postId } = req.body;
  // console.log('postId: ', postId);
  // console.log('commentContent: ', commentContent);
  // console.log('currency: ', currency);

  try {
    const commentData = `${postId} ${commentContent}`;
    // console.log('commentData:', commentData);

    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: commentData
        }
      }
    ];

    const payloadConfig = {
      txjson: {
        TransactionType: 'Payment',
        Destination: appXrplAddress,
        DestinationTag: 100,
        Amount: getTxAmount(currency),
        Memos: memosField
      },
      options: {
        submit: false,
        expire: 1440,
        return_url: {
          web: `${appReturnURL}/p/${postId}`
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

// @route   POST api/posts/like
// @desc    Like post
// @access  Public
router.post('/like', async (req, res) => {
  const { currency, postId } = req.body;
  console.log('postId: ', postId);
  console.log('currency: ', currency);

  try {
    // create payload
    const memosField = [
      {
        Memo: {
          MemoData: postId
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
        submit: false,
        expire: 1440,
        return_url: {
          web: `${appReturnURL}/p/${postId}`
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
