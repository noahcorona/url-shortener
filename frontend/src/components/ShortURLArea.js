import {useState} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import QRCode from 'react-qr-code';
import {FaClipboard} from 'react-icons/fa';

const ShortURLArea = ({status, linkData, setLinkData}) => {
  const {ext, originalURL, lifespan} = linkData;
  const [copied, setCopied] = useState(false);

  const shortURL = 'https://smlr.org/' + ext;

  const handleFocus = (event) => event.target.select();

  const handleCopyClick = () => {
    copyTextToClipboard(shortURL)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
  };

  /**
   *
   * @param {string} text - the text to copy
   * @return {Promise<boolean|void>} - boolean promise
   */
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  /**
   * Convert lifespan value to appropriate text
   * @return {string|*}
   */
  function getLifespanText() {
    if (lifespan === '0') {
      return 'forever';
    } else {
      return lifespan;
    }
  }

  if (status === null && linkData.ext) {
    return (
      <div
        id="short-url-area"
        className="Content-Card"
      >
        <h3>
          <a
            className="Link"
            href={originalURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {originalURL}
          </a>
          {' > '}
          <a
            className="Link"
            href={shortURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortURL}
          </a>
        </h3>
        <p>
          {getLifespanText() === 'forever' ?
            'This link has no expiration date' :
            'This link expires in ' + getLifespanText()}
        </p>
        <div className='bottom-spaced'>
          <InputGroup>
            <Form.Control
              onFocus={handleFocus}
              type="text"
              value={shortURL}
              readOnly
            />
            <Button
              variant="secondary"
              className="light-button"
              onClick={handleCopyClick}
            >
              {copied ? 'Copied to Clipboard' : (
                  <>Copy<FaClipboard className="button-icon" /></>
              )}
            </Button>
          </InputGroup>
        </div>
        <div className="QR-Area d-grid gap-2">
          {
            shortURL && (
              <QRCode
                className="centered"
                value={shortURL}
                alt={shortURL}
              />
            )
          }
          <Button
            variant="secondary"
            className="d-block light-button bottom-spaced"
          >
            Copy image
            <FaClipboard className="button-icon" />
          </Button>
        </div>
        <div className="d-grid gap-2">
          <Button
            variant="secondary"
            className="d-block go-button"
            onClick={() => setLinkData(null)}
          >
            Make another short URL
          </Button>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ShortURLArea;
