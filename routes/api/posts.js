const express = require('express');
const { XrplClient } = require('xrpl-client');

const client = new XrplClient('wss://fh.xrpl.ws');

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
    const serverInfo = await client.send({ command: 'server_info' });
    console.log({ serverInfo });

    const postTransactions = await client.send({
      command: 'account_tx',
      account: 'r9pRgEJnRvYsTg3hxGScPx4WTapj2KYLRp'
    });
    console.log(postTransactions);
    res.send({ postTransactions });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

module.exports = router;
