import {Button, Form, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {FaClipboard} from 'react-icons/fa';

const URLInputArea = (props) => {
  const [url, setUrl] = useState('');
  const [reqExt, setReqExt] = useState('');
  const [lifespan, setLifespan] = useState('0');

  const submitHandler = (e) => {
    // prevent default form submission behavior, clear input
    e.preventDefault();

    // reset input and call the url form handler
    setUrl('');
    props.onFormSubmit({url, reqExt, lifespan});
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
      <div>
        <div className="Content-Header">
          <h3>URL Shortener with QR Generation</h3>
        </div>
        <div
          data-testid="urlInputElement"
          id="url-input-area"
          className="Content-Card"
        >
          {props.status && props.status !== 'waiting' && props.linkData &&
            <h3 className="error-text">{props.status}</h3>
          }
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
                  Paste
                  <FaClipboard className="button-icon"/>
                </Button>
              </InputGroup>
            </div>
            <InputGroup className="bottom-spaced">
              <InputGroup.Text className="custom-extension-prefix">
                  https://smlr.org/
              </InputGroup.Text>
              <Form.Control
                id="reqExt"
                type="text"
                placeholder="optional-custom-extension"
                onChange={(e) => {
                  setReqExt(e.target.value);
                }}
                className="italic"
                value={reqExt}
              />
            </InputGroup>
            <Form.Select
              aria-label="Default select example"
              id="lifespan"
              onChange={(e) => setLifespan(e.target.value)}
              className="bottom-spaced"
            >
              <option value="0">Lasts forever</option>
              <option value="1 year">Expires in a year</option>
              <option value="6 months">Expires in 6 months</option>
              <option value="3 months">Expires in 3 months</option>
              <option value="1 month">Expires in a month</option>
              <option value="1 week">Expires in a week</option>
              <option value="1 day">Expires in a day</option>
            </Form.Select>
            <div className="d-grid">
              <Button
                type="submit"
                variant="secondary"
                className="go-button"
              >
                Create link
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default URLInputArea;
