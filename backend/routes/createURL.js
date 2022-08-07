const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const urlDB = require('../models/URL');

function validateUrl(value) {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
}

// Short URL Generator
router.post('/create', async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

  const baseURL = 'http://localhost:3000';
  const destinationURL = req.body.destination;

  const randomID = shortid.generate();
  if (validateUrl(destinationURL)) {
    try {
      let url = await urlDB.findOne({destination: destinationURL});
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseURL + '/' + randomID;

        url = new urlDB({
          ext: randomID,
          destination: destinationURL,
          date: new Date(),
          shortened: shortUrl,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server error');
    }
  } else {
    res.status(400).json('Invalid URL was provided as input');
  }
});

module.exports = router;
