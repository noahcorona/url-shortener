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
    const lifespan = urlData.lifespan;

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
          lifespan: lifespan,
        });
        setStatus(null);
        console.log('API response: ', response);
      })
          .catch((error) => {
            if (error.response) {
              setStatus('Sorry! Looks like there\'s been an error' +
                  ' on our part.');
            } else if (error.request) {
              setStatus('Sorry! Our server isn\'t responding.');
            } else {
              setStatus('Oops! It looks like the request was malformed. ');
            }
            console.log('API response (error): ', error);
          });
    } else {
      setStatus('Oops. That doesn\'t look like a URL!');
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
      {
        windowSize > 600 && <NavBar onDocClick={toggleDocModal}/>
      }
      <div className="Content">
        <div>
          {
            windowSize < 600 &&
              <ExpandingNavBar onDocClick={toggleDocModal}/>
          }
        </div>
        <DocModal
          show={modalShowing}
          handleClose={() => setModalShowing(false)}
        />
        <div className="Content-Centered">
          <URLInputArea
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
          />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
