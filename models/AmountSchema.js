const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AmountSchema = new Schema({
  currency: {
    type: String,
    default: 'XRP'
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = { AmountSchema };
