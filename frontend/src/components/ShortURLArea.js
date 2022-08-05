import {useState} from 'react';
import {Button, Form} from 'react-bootstrap';

// eslint-disable-next-line react/prop-types
const ShortURLArea = ({copyText, originalURL, lifespan}) => {
  const [copied, setCopied] = useState(false);

  const handleFocus = (event) => event.target.select();

  const handleCopyClick = () => {
    copyTextToClipboard(copyText)
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

  return (
    <>
      <div className='divider' />
      <div>
        <b>
          <a
            className="Link"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
              https://smlr.org/yourlink
          </a>
        </b>
        <p>
          {/* eslint-disable-next-line react/prop-types */}
            This link&apos;s lifespan is set to {lifespan.toLowerCase()}
        </p>
        <p>
            URL destination: {originalURL}
        </p>
        <div className='url-form'>
          <Form.Control
            onFocus={handleFocus}
            type="text"
            value={copyText}
            readOnly
            selectTextOnFocus
          />
          <Button className="btn-light" onClick={handleCopyClick}>
            <span>
              {copied ? 'Copied to Clipboard' : 'Click to Copy'}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ShortURLArea;