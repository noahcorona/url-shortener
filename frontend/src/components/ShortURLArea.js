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
      className="url-input-area"
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
      </b>
      <p>
        {/* eslint-disable-next-line react/prop-types */}
            This link&apos;s lifespan is set to {getLifespanText()}
      </p>
      <p>
        To: <a
          className="Link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          {originalURL}
        </a>
      </p>
      <div className='url-form'>
        <InputGroup>
          <Form.Control
            onFocus={handleFocus}
            type="text"
            value={shortURL}
            readOnly
            selectTextOnFocus
          />
          <Button className="paste-button" onClick={handleCopyClick}>
            {copied ? 'Copied to Clipboard' : (
                  <>Copy<FaClipboard className="paste-icon" /></>
              )}
          </Button>
        </InputGroup>
      </div>
      <div className="QR-Area d-grid gap-2">
        <QRCode
          value={shortURL}
          alt={shortURL}
        />
        <Button>
            Copy image
          <FaClipboard className="paste-icon" />
        </Button>
      </div>
    </div>
  );
};

export default ShortURLArea;
