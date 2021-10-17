const mongoose = require('mongoose');
const { AmountSchema } = require('./AmountSchema');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
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
  amount: AmountSchema,
  date: {
    type: Date,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  memoData: {
    type: String,
    default: ''
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };
