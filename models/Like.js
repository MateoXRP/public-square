const mongoose = require('mongoose');
const { AmountSchema } = require('./AmountSchema');

const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  postHash: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userAccount: {
    type: String,
    required: true
  },
  amount: AmountSchema,
  date: {
    type: Date,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like };
