const express = require('express');

const { appBaseUrl } = require('../../config/app-config');

const { sendPayload, getPayload } = require('../../services/xumm');
const { getUserInfo } = require('../../controllers/users');

const router = express.Router();

// @route   POST api/user/signin
// @desc    Signin w/xumm auth
// @access  Public
router.post('/signin', async (req, res) => {
  try {
    const payloadConfig = {
      txjson: {
        TransactionType: 'SignIn'
      },
      options: {
        submit: false,
        expire: 1440,
        return_url: {
          web: `${appBaseUrl}/signing-in?id={id}`
        }
      }
    };

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // log activity
    console.log('xumm signin submitted');

    res.send({ payload_uuid: data.uuid });
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/user/data
// @desc    Confirm tx and get data
// @query   id: payload_uiid
// @access  Public
router.get('/data', async (req, res) => {
  const { id } = req.query;
  console.log(`user/data route: ${id}`);
  try {
    // confirm transaction using xumm
    const data = await getPayload(id);

    const userData = {
      application: data.application,
      response: data.response
    };

    res.send(userData);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/user/info
// @desc    Get user info: username; gravatarURL
// @query   account: user account/address
// @access  Public
router.get('/info', async (req, res) => {
  const { account } = req.query;
  console.log('user/info route: ', account);
  try {
    const userInfo = await getUserInfo(account);

    // check result
    console.log('route/userInfo: ', userInfo);

    res.send(userInfo);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

module.exports = router;
