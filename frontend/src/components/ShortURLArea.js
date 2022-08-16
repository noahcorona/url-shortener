import {useState} from 'react';
import {Button, Form, InputGroup} from 'react-bootstrap';
import QRCode from 'react-qr-code';
import {FaCopy} from 'react-icons/fa';
import {BsArrowRight} from 'react-icons/bs';

const ShortURLArea = ({status, linkData, setLinkData}) => {
  const {ext} = linkData;
  const [copied, setCopied] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);

  const shortURL = 'https://smlr.org/' + ext;

  const handleFocus = (event) => event.target.select();

  const handleCopyClick = (image) => {
    if (image) {
      copyTextToClipboard(shortURL)
          .then(() => {
            setCopiedImage(true);
            setTimeout(() => {
              setCopiedImage(false);
            }, 1500);
          })
          .catch((err) => {
            console.log(err);
          });
    } else {
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
    }
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

  if (status === null && linkData.ext) {
    return (
      <div
        id="short-url-area"
        className="Short-URL-Area"
      >
        <div className='Short-URL-Main-Area'>
          <h3>{shortURL}</h3>
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
              onClick={() => handleCopyClick(false)}
            >
              {
                  copied ? 'Copied to Clipboard' : (
                    <FaCopy className="button-icon" />
                  )
              }
            </Button>
          </InputGroup>
        </div>
        <div className="Short-URL-QR-Area">
          {
            shortURL && (
              <QRCode
                size={115}
                value={shortURL}
                alt={shortURL}
              />
            )
          }
          <Button
            variant="secondary"
            className="image-copy-button"
            onClick={() => handleCopyClick(true)}
          >
            {
                copiedImage ? 'Copied image to clipboard' : (
                  <FaCopy className="button-icon" />
                )
            }
          </Button>
        </div>
        <Button
          variant="secondary"
          className="d-block go-button"
          onClick={() => setLinkData(null)}
        >
          <span>Make another URL</span>
          <BsArrowRight />
        </Button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ShortURLArea;
