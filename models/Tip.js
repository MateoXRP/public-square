const mongoose = require('mongoose');
const { AmountSchema } = require('./AmountSchema');

const Schema = mongoose.Schema;

const TipSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  postHash: {
    type: String,
    required: true
  },
  donor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorAccount: {
    type: String,
    required: true
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipientAccount: {
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

const Tip = mongoose.model('Tip', TipSchema);

module.exports = { Tip };
