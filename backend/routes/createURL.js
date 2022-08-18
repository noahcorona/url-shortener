const Express = require('express');
const router = Express.Router();
const shortid = require('shortid');
const Filter = require('bad-words');
const urlDB = require('../models/URL');

// Validate URL string and check for profanity
function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
}

// Check text for profanity
async function isProfane(text) {
  let filter = new Filter();
  return filter.isProfane(text);
}

// Short URL Generator
router.post('/create', async (req, res) => {
  const baseURL = 'https://smlr.org';
  const destinationURL = req.body.destination;
  const reqExt = req.body.reqExt;

  // validate URL and check requested extension for profanity
  if(!validateURL(destinationURL)) {
    res.status(400).json('An invalid destination URL was provided');
  }

  let ext = '';

  if(reqExt === null || reqExt === undefined) {
    // generate an extension with no profanity that is not taken in MongoDB
    let idIsOkay = false;
    while(!idIsOkay) {
      ext = shortid.generate()
      let profane = await isProfane(ext);
      let exists = await urlDB.findOne({ext: ext});
      idIsOkay = !profane && !exists;
    }
  } else {
    // check the requested extension for profanity or route names
    if(reqExt === 'create' || reqExt === 'go') {
      // the URL was valid but has the same name as a route
      res.status(400).json('The URL extension provided is not allowed');
    } else if(await isProfane(reqExt)) {
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
  }

  try {
    // create a new entry in URLs database
    let url = new urlDB({
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
