const express = require('express');

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

module.exports = router;
