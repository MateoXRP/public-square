const express = require('express');

const {
  appReturnURL,
  sendPayload,
  getPayload
} = require('../../services/xumm');

const router = express.Router();

// @route   POST api/user/signin
// @desc    Signin w/xumm auth
// @access  Public
router.post('/signin', async (req, res) => {
  // const dummyData = {
  //   uuid: '30e91d79-9cec-4e00-a582-0ff74314a345'
  // };
  try {
    const payloadConfig = {
      txjson: {
        TransactionType: 'SignIn'
      },
      options: {
        submit: false,
        expire: 1440,
        return_url: {
          web: `${appReturnURL}/signin?id={id}`
        }
      }
    };

    // submit transaction using xumm
    const data = await sendPayload(payloadConfig);

    // check result
    console.log('payload data: ', data);
    console.log('payload response uuid: ', data.uuid);

    res.send({ payload_uuid: data.uuid });
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});

// @route   GET api/user/info
// @desc    Confirm tx and get info
// @query   id: payload_uiid
// @access  Public
router.get('/info', async (req, res) => {
  const { id } = req.query;

  try {
    // confirm transaction using xumm
    const data = await getPayload(id);

    // check result
    console.log('data.application: ', data.application);

    // Todo: Create JWT?
    const userData = {
      application: data.application,
      response: data.response
    };

    console.log('data.userData: ', data.userData);

    res.send(userData);
  } catch (error) {
    console.error(error);
    res.send({ error });
  }
});
module.exports = router;
