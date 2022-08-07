const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const urlDB = require('../models/URL');
const {hasProfaneWords} = require("aedos");

// Validate URL string and check for profanity
async function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// Short URL Generator
router.post('/create', async (req, res) => {
  const baseURL = 'http://localhost';
  const destinationURL = req.body.destination;
  const reqExt = req.body.reqExt;

  // validate URL and check requested extension for profanity
  if(!(await validateURL(destinationURL))) {
    res.status(400).json('An invalid destination URL was provided');
  }

  let ext = '';

  if(reqExt) {
    // check the requested extension for profanity
    if(hasProfaneWords(reqExt)) {
      // the URL was valid but requested extension contained profanity
      res.status(400).json('A profane URL extension was provided');
    } else {
      if(await urlDB.findOne({ext: reqExt})) {
        // the requested URL extension is taken
        res.status(400).json('The URL extension provided is currently being used');
      } else {
        // the request URL is not taken and contains no profanity
        ext = reqExt;
      }
    }
  } else {
    // generate an extension with no profanity that is not taken in MongoDB
    ext = shortid.generate();
    while(hasProfaneWords(ext) || await urlDB.findOne({ext: ext})) {
      ext = shortid.generate()
    }
  }

  try {
    // create a new entry in URLs database
    const url = new urlDB({
      ext: ext,
      destination: destinationURL,
      date: new Date(),
      shortened: baseURL + '/' + ext,
    });
    await url.save();

    // send as a response a JSON object of the new MongoDB entry info
    res.json(url);
  } catch (err) {
    console.log('Error writing to MongoDB database:', err);

    // send a 500 server error as response
    res.status(500).json('Our servers are having trouble. We apologize for the inconvenience!');
  }
});

module.exports = router;
