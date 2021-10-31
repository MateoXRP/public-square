const { User } = require('../models/User');

const getBithompUsername = require('../services/bithomp').getBithompUsername;
const { getUserGravatar } = require('../util/user');

const getUserId = async account =>
  new Promise(async function (resolve, reject) {
    // console.log('account: ', account);
    try {
      // look for exising User with account
      const existingUser = await User.findOne({ account });
      // return if found
      if (existingUser) {
        resolve(existingUser._id);
      } else {
        // generate Gravatar URL
        const gravatarURL = await getUserGravatar(account);
        //console.log('gravatarURL: ', gravatarURL);

        const userData = {
          account,
          gravatarURL
        };

        // get username registered with bithomp
        //console.log('get username');
        // const username = await getBithompUsername(account);
        // console.log('username: ', username);
        // if (username) {
        //   userData.username = username;
        // }

        const newUser = new User(userData);
        const user = await newUser.save();

        //console.log('returning id');
        resolve(user._id);
      }
    } catch (error) {
      reject(error);
    }
  });

const getUserInfo = async account =>
  new Promise(async function (resolve, reject) {
    try {
      // look for exising User with account
      const existingUser = await User.findOne({ account });

      // return if found
      if (existingUser) {
        // console.log('existingUser: ', existingUser);
        resolve(existingUser);
      } else {
        // else create new user
        // generate Gravatar URL
        const gravatarURL = await getUserGravatar(account);

        const userData = {
          account,
          gravatarURL
        };

        // get username registered with bithomp
        const username = await getBithompUsername(account);

        if (username) {
          userData.username = username;
        }

        const newUser = new User(userData);
        await newUser.save();

        resolve(userInfo);
      }
    } catch (error) {
      console.log('error: ', error);
      reject(error);
    }
  });

module.exports = {
  getUserId,
  getUserInfo
};
