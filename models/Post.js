const mongoose = require('mongoose');
const { AmountSchema } = require('./AmountSchema');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  author: {
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
  content: {
    type: String,
    default: ''
  },
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment'
      }
    ],
    default: undefined
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like'
      }
    ],
    default: undefined
  },
  tips: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tip'
      }
    ],
    default: undefined
  }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post };
