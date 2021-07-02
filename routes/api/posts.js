const express = require('express');

const { getAccountTx } = require('../../services/xrpl-client');
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

module.exports = router;
