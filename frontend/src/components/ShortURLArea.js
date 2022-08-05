import {useState} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import QRCode from 'react-qr-code';
import {FaClipboard} from 'react-icons/fa';

// eslint-disable-next-line react/prop-types
const ShortURLArea = ({shortURL, originalURL, lifespan}) => {
  const [copied, setCopied] = useState(false);

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

  // eslint-disable-next-line require-jsdoc
  async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // eslint-disable-next-line require-jsdoc
  function getLifespanText() {
    if (lifespan === '0') {
      return 'forever';
    } else {
      return lifespan;
    }
  }

  return (
    <div
      id="short-url-area"
      className="Content-Card"
    >
      <b>
        <a
          className="Link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {originalURL}
        </a>
        {' > '}
        <a
          className="Link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {shortURL}
        </a>
      </b>
      <p>
        {/* eslint-disable-next-line react/prop-types */}
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
            selectTextOnFocus
          />
          <Button
            variant="success"
            className="paste-button"
            onClick={handleCopyClick}
          >
            {copied ? 'Copied to Clipboard' : (
                  <>Copy<FaClipboard className="button-icon" /></>
              )}
          </Button>
        </InputGroup>
      </div>
      <div className="QR-Area d-grid gap-2">
        <QRCode
          className="centered"
          value={shortURL}
          alt={shortURL}
        />
        <Button
          variant="success"
          className="d-block"
        >
            Copy image
          <FaClipboard className="button-icon" />
        </Button>
      </div>
    </div>
  );
};

export default ShortURLArea;
