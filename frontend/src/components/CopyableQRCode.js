import {QRCodeCanvas} from 'qrcode.react';
import {Button} from 'react-bootstrap';
import {FaCopy, FaShare} from 'react-icons/fa';
import {useState} from 'react';
import {copyBlobToClipboard} from 'copy-image-clipboard';
import {isMobile} from 'react-device-detect';

const CopyableQRCode = (props) => {
  const [copied, setCopied] = useState(false);

  const handleShareClick = async () => {
    const canvas = document.querySelector('.qr-code > canvas');
    const dataURL = canvas.toDataURL();
    const data = await fetch(dataURL);
    const blob = await data.blob();

    const filesArray = [
      new File(
          [blob],
          `${props.shortURL}.png`,
          {
            type: blob.type,
            lastModified: new Date().getTime(),
          },
      ),
    ];

    const shareData = {
      files: filesArray,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error('Error sharing image:', err);
      alert(err);
    }
  };

  const handleCopyClick = async () => {
    const canvas = document.querySelector('.qr-code > canvas');
    const image = canvas.toDataURL('image/png');
    const data = await fetch(image);
    const blob = await data.blob();

    copyBlobToClipboard(blob).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="Short-URL-QR-Area">
      {
        props.shortURL && (
          <div className="qr-code">
            <QRCodeCanvas
              size={115}
              value={props.shortURL}
              alt={props.shortURL}
            />
          </div>
        )
      }

      {
          isMobile ? (
                  <Button
                    variant="secondary"
                    className="image-copy-button"
                    onClick={() => handleShareClick()}
                  >
                    {
                      (copied ? 'Sharing image' : (
                              <FaShare className="button-icon" />
                          )
                      )
                    }
                  </Button>
              ) :
              <Button
                variant="secondary"
                className="image-copy-button"
                onClick={() => handleCopyClick()}
              >
                {
                  (copied ? 'Copied image to clipboard' : (
                          <FaCopy className="button-icon" />
                      )
                  )
                }
              </Button>
      }
    </div>
  );
};

export default CopyableQRCode;
