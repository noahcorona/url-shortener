import {Button, Form, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {FaClipboard} from 'react-icons/fa';

const URLInputArea = (props) => {
  const [url, setUrl] = useState('');
  const [lifespan, setLifespan] = useState('0');

  const submitHandler = (e) => {
    // prevent default form submission behavior, clear input
    e.preventDefault();

    // reset input and call the url form handler
    setUrl('');
    props.onFormSubmit({url, lifespan});
  };

  const pasteButtonHandler = async (e) => {
    // prevent default button behavior
    e.preventDefault();

    // copy clipboard text and set input text
    const text = await navigator.clipboard.readText();
    setUrl(text);
  };

  if (!props.linkData) {
    return (
      <div
        data-testid="urlInputElement"
        id="url-input-area"
        className="Content-Card"
      >
        <h3>Enter a URL</h3>
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
                  setUrl(e.target.value);
                }}
                value={url}
              />
              <Button
                variant="secondary"
                className="light-button"
                onClick={pasteButtonHandler}
              >
                  Paste <FaClipboard className="button-icon"/>
              </Button>
            </InputGroup>
          </div>
          <div>
            <InputGroup>
              <Form.Select
                aria-label="Default select example"
                id="lifespan"
                onChange={(e) => setLifespan(e.target.value)}
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
                variant="secondary"
              >
                  Create link
              </Button>
            </InputGroup>
          </div>
        </Form>
      </div>
    );
  } else {
    return <div />;
  }
};

export default URLInputArea;
