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
 * @param {string} amount
 * @return {string || object} string for XRP, object for MGS
 */
function getTxAmount(currency, amount = null) {
  return currency === 'MGS'
    ? {
        currency: 'MGS',
        value: amount ? amount.toString() : '1',
        issuer: 'rHP4bHzghBdzskqcaPciL5WRGkHosB5zYx'
      }
    : amount
    ? (amount * 1000000).toString()
    : '10000';
}

/**
 * @desc sends payload to Xumm API
 * @param {object} payloadConfig Xumm payload
 * @return {object} payload response
 */
async function sendPayload(payloadConfig) {
  const config = {
    headers: xummHeaders
  };

  const payload = JSON.stringify(payloadConfig);

  // console.log('payload', payload);

  try {
    const result = await axios.post(
      'https://xumm.app/api/v1/platform/payload',
      payload,
      config
    );

    // console.log('xumm result:', result.data);

    if (result.status !== 200) {
      throw new Error('Sorry, something went wrong. Please try again later');
    }

    return result.data;
  } catch (error) {
    console.log(error);

    return error;
  }
}

/**
 * @desc gets payload info from Xumm API
 * @param {string} payloadUuid Xumm payload
 * @return {object} payload result
 */
async function getPayload(payloadUuid) {
  const config = {
    headers: xummHeaders
  };

  try {
    const result = await axios.get(
      `https://xumm.app/api/v1/platform/payload/${payloadUuid}`,
      config
    );

    // console.log('xumm result:', result.data);

    if (result.status !== 200) {
      throw new Error('Sorry, something went wrong. Please try again later');
    }

    return result.data;
  } catch (error) {
    console.log(error);

    return error;
  }
}

module.exports = { appReturnURL, getTxAmount, sendPayload, getPayload };
