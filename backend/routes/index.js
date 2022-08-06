const Express = require('express');
const router = Express.Router();
const urlDB = require('../models/URL');

router.get('/:ext', async (req, res) => {
  try {
    console.log(req.params.ext);
    const url = await urlDB.findOne({ ext: req.params.ext });
    console.log(url);
    if (url) {
      // increment click counter and save database
      url.clicks++;
      url.save();

      console.log('found', url)

      // redirect the user
      return res.redirect(url.destination);
    } else {
      res.status(404).json('Link ID not found. Has the link expired?');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
