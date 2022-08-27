import {useEffect, useState} from 'react';
import ShortURLArea from './components/ShortURLArea';
import URLInputArea from './components/URLInputArea';
import DocModal from './components/DocModal';
import WaitingArea from './components/WaitingArea';
import axios from 'axios';
import isURL from 'validator/lib/isURL';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import ExpandingNavBar from './components/ExpandingNavBar';

const API_URL = 'https://api.smlr.org';

/**
 * Application entry point
 * @return {JSX.Element}
 * @constructor
 */
function App() {
  const [modalShowing, setModalShowing] = useState(false);
  const [linkData, setLinkData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    /**
     * Resize update handler to track window width
     * Used to modify the navigation bar for mobile
     * devices and narrow windows
     */
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  /**
   * the URL creation form submission handler
   *   validates the URL and makes a POST request to the smlr API
   *
   * @param {object} urlData - the form data representing url creation params
   * @return {Promise<void>}
   */
  async function onFormSubmit(urlData) {
    let url = urlData.url;
    const reqExt = urlData.reqExt;

    // URL validation
    if (isURL(url)) {
      // toggle waiting status
      setStatus('waiting');

      // prepend http if not already in url
      if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
      }

      const requestData = reqExt ? {
        destination: url,
        reqExt: reqExt,
      } : {
        destination: url,
      };

      // make a POST request to the create API
      axios.post(
          API_URL + '/create',
          requestData,
      ).then((response) => {
        setLinkData({
          ext: response.data.ext,
          originalURL: url,
        });
        setStatus(null);
        console.log('API response: ', response);
      })
          .catch((error) => {
            if (error.response.status === 400) {
              setError(error.response.data);
            } else if (error.request) {
              setError('Sorry! Our server isn\'t responding.');
            } else {
              setError('Oops! It looks like the request was malformed. ');
            }

            setStatus(null);
          });
    } else {
      setError('Oops. That doesn\'t look like a URL!');
      setStatus(null);
    }
  }

  /**
   * show the documentation window
   * @param {event} e - button click event
   */
  function toggleDocModal(e) {
    e.preventDefault();
    setModalShowing(true);
  }

  return (
    <div className="App">
      <div className="Content">
        <div>
          {
            windowSize < 700 ?
              <ExpandingNavBar onDocClick={toggleDocModal}/> :
              <NavBar onDocClick={toggleDocModal}/>
          }
        </div>
        <DocModal
          show={modalShowing}
          handleClose={() => setModalShowing(false)}
        />
        <div className="Content-Centered">
          <URLInputArea
            error={error}
            status={status}
            setStatus={setStatus}
            linkData={linkData}
            onFormSubmit={onFormSubmit}
          />
          <WaitingArea
            status={status}
            setStatus={setStatus}
          />
          <ShortURLArea
            status={status}
            setStatus={setStatus}
            linkData={linkData ? linkData : {}}
            setLinkData={setLinkData}
            windowSize={windowSize}
          />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
