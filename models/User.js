const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  account: {
    type: String,
    required: true
  },
  gravatarURL: {
    type: String,
    required: true
  },
  username: {
    type: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };
