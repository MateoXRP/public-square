const mongoose = require('mongoose');
const { AmountSchema } = require('./AmountSchema');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
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
  },
  content: {
    type: String,
    default: ''
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like'
    }
  ],
  tips: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tip'
    }
  ]
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
