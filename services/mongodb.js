const mongoose = require('mongoose');
const dbUri = require('../config/keys').dbUri;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    // eslint-disable-next-line
    process.exit(1);
  }
};

module.exports = connectDB;
