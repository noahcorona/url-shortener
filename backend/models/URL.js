const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  destination: {
    type: String,
    required: true,
  },
  ext: {
    type: String,
    required: true,
  },
  shortened: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('url', UrlSchema);
