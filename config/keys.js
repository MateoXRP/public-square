if (process.env.NODE_ENV === 'production') {
  module.exports = require('./keys_prod');
} else {
  // eslint-disable-next-line
  module.exports = require('./keys_dev');
}
