const { User } = require('../models/User');

const getBithompUsername = require('../services/bithomp').getBithompUsername;
const { getUserGravatar } = require('../util/user');

const getUserId = async account => {
  let user;

  // look for exising User with account
  const existingUser = await User.find({ account });

  // return if found
  if (existingUser) return existingUser._id;

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
  user = await newUser.save();

  return user._id;
};

const getUserInfo = async account => {
  try {
    let user;

    // look for exising User with account
    const existingUser = await User.find({ account });

    // return if found
    if (existingUser) return existingUser._id;

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
    user = await newUser.save();

    return userInfo;
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  getUserId,
  getUserInfo
};
