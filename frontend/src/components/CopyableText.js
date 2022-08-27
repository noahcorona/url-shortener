import {Button, Form, InputGroup} from 'react-bootstrap';
import {FaCopy} from 'react-icons/fa';
import {useState} from 'react';

const CopyableText = (props) => {
  const [copied, setCopied] = useState(false);

  const handleFocus = (event) => event.target.select();

  const handleCopyClick = () => {
    copyTextToClipboard(props.shortURL)
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

  const copyTextToClipboard = async (text) => {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  };

  return (
    <InputGroup>
      <Form.Control
        onFocus={handleFocus}
        type="text"
        value={props.shortURL}
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
  );
};

export default CopyableText;
