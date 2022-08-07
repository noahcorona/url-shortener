const mongoose = require('mongoose');

/**
 * MongoDB URL schema
 * destination: destination of the shortened link
 * ext: extension (id) of the shortened link (api.smlr.org/go/ext)
 * shortened: shortened version of the destination link
 * date: date of link creation
 * clicks: number of clicks of the shortened link
  */
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
  redirects: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model('url', UrlSchema);
