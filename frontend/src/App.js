import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import ShortURLArea from './components/ShortURLArea';
import URLInputArea from './components/URLInputArea';
import Navigation from './components/Navigation';
import DocModal from './components/DocModal';
import axios from 'axios';

/**
 * Entry point of our application
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  const [modalShowing, setModalShowing] = useState(false);
  const [shortenedURL, setShortenedURL] = useState(null);
  const [formValues, setFormValues] = useState(null);

  // effect to fetch from API when form is submitted
  useEffect(() => {
    /*
      formValues structure and values:
      {
        url: "https://yoururl.com/",
        lifespan: "0" (forever) or
                  "number length-descriptor" (e.g. 1 day)
       }
    */

    /**
     * Fetch the shortened URL from the SMLR API using a GET request
     * @param {string} url - the url to shorten
     * @param {string} lifespan - the lifespan of the url
     * @return {Promise<AxiosResponse<any>>} the API response with a JSON body
     */
    async function getShortURL(url, lifespan) {
      return axios.post('/create', {
        destination: url,
      });
    }

    if (formValues) {
      getShortURL(formValues.url, formValues.lifespan)
          .then((res) => {
            console.log('API response: ', res);
            setShortenedURL(res.data.shortened);
          })
          .catch((error) => {
            console.log('error making API request')
            if (error.response) {
            // The request was made and the server
            // responded with a status code
            // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the
            // browser and an instance of
            // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the
              // request that triggered an Error
              console.log('Error', error.message);
            }
            console.log(error.config);
          });
    }
  }, [formValues]);

  return (
    <div className="App">
      <div className="Content">
        <DocModal
          show={modalShowing}
          handleClose={() => setModalShowing(false)}
        />
        <Navigation
          onDocClick={(e) => {
            e.preventDefault();
            setModalShowing(true);
          }}
        />
        <div className="Content-Body">
          <div className="Content-Centered">
            <URLInputArea setFormValues={setFormValues} />
            {shortenedURL && (
              <ShortURLArea
                shortURL={shortenedURL}
                originalURL={formValues.url}
                lifespan={formValues.lifespan}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
