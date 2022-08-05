import {Button, Form, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {FaClipboard} from 'react-icons/fa';
import isURL from 'validator/lib/isURL';

const URLInputArea = (props) => {
  const [inputURL, setInputURL] = useState('');
  const [inputLifespan, setInputLifespan] = useState('0');
  const [error, setError] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isURL(inputURL)) {
      props.setFormValues({url: inputURL, lifespan: inputLifespan});
      const shortURLArea = document.getElementById('short-url-area');
      window.scrollTo({
        top: shortURLArea.offsetTop,
        behavior: 'smooth',
      });
    } else {
      setInputURL('');
      setError('The URL entered was not valid');
    }
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    console.log('Pasted', text);
    setInputURL(text);
  };

  return (
    <div
      id="url-input-area"
      className="Content-Card"
    >
      <b>Enter a URL</b>
      <p>A smlr.org link and QR code will be created</p>
      <Form
        className="url-form"
        onSubmit={submitHandler}
      >
        <div className="bottom-spaced">
          <InputGroup>
            <Form.Control
              id="url"
              type="text"
              placeholder="https://yoururl.com/"
              onChange={(e) => {
                setInputURL(e.target.value);
              }}
              value={inputURL}
            />
            <Button
              variant="success"
              onClick={clickHandler}
            >
              Paste <FaClipboard className="button-icon" />
            </Button>
          </InputGroup>
        </div>
        <div className="bottom-spaced">
          <InputGroup>
            <Form.Select
              aria-label="Default select example"
              id="lifespan"
              onChange={(e) => setInputLifespan(e.target.value)}
            >
              <option value="0">Forever</option>
              <option value="1 year">A year</option>
              <option value="6 months">6 months</option>
              <option value="3 months">3 months</option>
              <option value="1 month">A month</option>
              <option value="1 week">A week</option>
              <option value="1 day">A day</option>
            </Form.Select>
            <Button
              type="submit"
              variant="success"
            >
              Create link
            </Button>
          </InputGroup>
        </div>
        {
          error && <p className="error-text">{error}</p>
        }
      </Form>
    </div>
  );
};

export default URLInputArea;
