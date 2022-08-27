import {QRCodeCanvas} from 'qrcode.react';
import {Button} from 'react-bootstrap';
import {FaCopy} from 'react-icons/fa';
import {useState} from 'react';

const CopyableQRCode = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    copyImgToClipboard()
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

  const copyImgToClipboard = async () => {
    const canvas = document.querySelector('.qr-code > canvas');
    const image = canvas.toDataURL('image/png');
    const data = await fetch(image);
    const blob = await data.blob();

    const item = new window.ClipboardItem({'image/png': blob});
    await navigator.clipboard.write([item])
        .then(function() {
          console.log('Copied to clipboard');
        }, (error) => {
          console.error('Error:', error);
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
      <Button
        variant="secondary"
        className="image-copy-button"
        onClick={() => handleCopyClick()}
      >
        {
          copied ? 'Copied image to clipboard' : (
                <FaCopy className="button-icon" />
            )
        }
      </Button>
    </div>
  );
};

export default CopyableQRCode;
