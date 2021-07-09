const axios = require('axios');

const xummApiKey = require('../config/keys').xummApiKey;
const xummApiSecret = require('../config/keys').xummApiSecret;

const appReturnURL = 'https://pub-sq.herokuapp.com';

const xummHeaders = {
  'content-type': 'application/json',
  'X-API-Key': xummApiKey,
  'X-API-Secret': xummApiSecret
};

/**
 * @desc get payload amount based on currency
 * @param {string} currency
 * @return {string || object} string for XRP, object for MGS
 */
function getTxAmount(currency) {
  return currency === 'MGS'
    ? {
        currency: 'MGS',
        value: '1',
        issuer: 'rHP4bHzghBdzskqcaPciL5WRGkHosB5zYx'
      }
    : '10000';
}

/**
 * @desc sends payload to Xumm API
 * @param {object} payloadConfig Xumm payload
 * @return {string} payloadURL for client redirect to Xumm
 */
async function sendPayload(payloadConfig) {
  const config = {
    headers: xummHeaders
  };

  const payload = JSON.stringify(payloadConfig);

  console.log('payload', payload);

  try {
    const result = await axios.get(
      'https://xumm.app/api/v1/platform/ping',
      config
    );
    // const result = await axios.post(
    //   'https://xumm.app/api/v1/platform/payload',
    //   payload,
    //   config
    // );

    // console.log('payload result xumm:', result.data);
    if (result.status !== 200) {
      throw new Error('Sorry, something went wrong. Please try again later');
    }

    // return payload URL
    const data = {
      ...result.data,
      next: {
        always: 'https://xumm.dev'
      }
    };
    // console.log('payload result:', data);

    return data;
  } catch (error) {
    console.log(error);

    return error;
  }
}

module.exports = { appReturnURL, getTxAmount, sendPayload };
