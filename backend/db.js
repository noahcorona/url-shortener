const mongoose = require('mongoose');
const mongoCredentials = require('./secrets/mongoCredentials')

// MongoDB connection
const connectDB = async (port) => {
  try {
    await mongoose.connect(
      'mongodb://' + mongoCredentials.username + ':' + mongoCredentials.password +
      '@' + mongoCredentials.ip + ':' + port + '/urldb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB on port', port);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
