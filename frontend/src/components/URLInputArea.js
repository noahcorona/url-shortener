import {Button, Form, InputGroup} from 'react-bootstrap';
import {useState} from 'react';
import {FaClipboard} from 'react-icons/fa';

const URLInputArea = (props) => {
  const [inputURL, setInputURL] = useState('');
  const [inputLifespan, setInputLifespan] = useState('0');

  const submitHandler = (e) => {
    e.preventDefault();
    // eslint-disable-next-line react/prop-types
    props.setLastInput({inputURL, inputLifespan});
  };

  const clickHandler = async (e) => {
    e.preventDefault();
    const text = await navigator.clipboard.readText();
    console.log('Pasted', text);
    setInputURL(text);
  };

  return (
    <>
      <div>
        <b>Enter a URL</b>
        <p>If desired, choose a lifespan for the link</p>
        <Form
          className="url-form"
          onSubmit={submitHandler}
        >
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
              bsPrefix="paste-button"
              onClick={clickHandler}
            >
              Paste <FaClipboard className="paste-icon" />
            </Button>
          </InputGroup>
          <InputGroup>
            <Form.Select
              aria-label="Default select example"
              id="lifespan"
              onChange={(e) => {
                setInputLifespan(e.target.value);
              }}
            >
              <option value="0">Forever</option>
              <option value="1 year">A year</option>
              <option value="6 months">6 months</option>
              <option value="3 months">3 months</option>
              <option value="1 month">A month</option>
              <option value="1 week">A Week</option>
              <option value="1 day">A Day</option>
            </Form.Select>
          </InputGroup>
          <Button
            type="submit"
            className="btn-toolbar"
          >
              Shorten
          </Button>
        </Form>
      </div>
    </>
  );
};

export default URLInputArea;
