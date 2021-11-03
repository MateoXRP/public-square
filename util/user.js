const md5 = require('@xn-02f/md5');
const getXRPEmailHash = require('../services/xrpscan').getXRPEmailHash;

/**
 * @desc generate user gravatar url from account/address
 * @param {string} account
 * @return {string} gravatarURL
 */
const getUserGravatar = async account =>
  new Promise(async function (resolve, reject) {
    try {
      // generate Gravatar URL
      const xrpEmailHash = await getXRPEmailHash(account);

      const emailHash = xrpEmailHash
        ? xrpEmailHash.toLowerCase()
        : md5(account);

      const gravatarURL = `https://www.gravatar.com/avatar/${emailHash}?s=24&d=retro`;

      resolve(gravatarURL);
    } catch (error) {
      console.log('error: ', error);
      reject(error);
    }
  });

module.exports = { getUserGravatar };
