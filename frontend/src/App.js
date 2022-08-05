import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect, useState} from 'react';
import ShortURLArea from './components/ShortURLArea';
import URLInputArea from './components/URLInputArea';
import Navigation from './components/Navigation';
import DocModal from './components/DocModal';
import axios from 'axios';

// eslint-disable-next-line require-jsdoc
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

    // eslint-disable-next-line require-jsdoc
    async function getShortURL(url, lifespan) {
      return axios.get('/api', {
        params: {
          url: url,
          lifespan: lifespan,
        },
      });
    }

    if (formValues) {
      getShortURL(formValues.url, formValues.lifespan)
          .then((res) => {
            console.log('API response: ', res);
          })
          .catch((error) => {
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

      setShortenedURL('https://test.org/');
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
