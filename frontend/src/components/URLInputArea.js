import {Button, Form, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {FaPaste} from 'react-icons/fa';
import {BsArrowRight} from 'react-icons/bs';

const URLInputArea = (props) => {
  const [url, setUrl] = useState('');
  const [reqExt, setReqExt] = useState('');

  const submitHandler = (e) => {
    // prevent default form submission behavior, clear input
    e.preventDefault();

    // reset input and call the url form handler
    setUrl('');
    props.onFormSubmit({url, reqExt});
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
        <div
          data-testid="urlInputElement"
          id="url-input-area"
          className="Content-Card"
        >
          <InputGroup className="top-spaced bottom-spaced">
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
              <FaPaste className="button-icon"/>
            </Button>
          </InputGroup>
          {props.status && props.status !== 'waiting' && props.linkData &&
            <h3 className="error-text">{props.status}</h3>
          }
          <Form
            className="url-form"
            onSubmit={submitHandler}
          >
            <InputGroup className="bottom-spaced">
              <InputGroup.Text className="custom-extension-prefix">
                  smlr.org/
              </InputGroup.Text>
              <Form.Control
                id="reqExt"
                type="text"
                placeholder="alias"
                onChange={(e) => {
                  setReqExt(e.target.value);
                }}
                className="italic"
                value={reqExt}
              />
            </InputGroup>
            <Button
              type="submit"
              variant="secondary"
              className="go-button"
            >
              <span>Create URL</span>
              <BsArrowRight />
            </Button>
          </Form>
        </div>
      </div>
    );
  } else {
    return <div />;
  }
};

export default URLInputArea;
