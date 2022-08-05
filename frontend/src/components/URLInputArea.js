import {Button, Form} from "react-bootstrap";
import {useState} from "react";

const URLInputArea = (props) => {
    const [inputURL, setInputURL] = useState('');
    const [inputLifespan, setInputLifespan] = useState('0');

    const submitHandler = (e) => {
        e.preventDefault();
        props.setLastInput({inputURL, inputLifespan})
    }

    return (
        <>
            <div>
                <b>Enter a URL</b>
                <p>If desired, choose a lifespan for the link</p>
                <Form
                    className="url-form"
                    onSubmit={submitHandler}
                >
                    <Form.Control
                        id="url"
                        placeholder="https://yoururl.com/"
                        onChange={(e) => {
                            setInputURL(e.target.value);
                        }}
                    />
                    <Form.Select
                        aria-label="Default select example"
                        id="lifespan"
                        onChange={(e) => {
                            setInputLifespan(e.target.value);
                        }}
                    >
                        <option value="0">Forever</option>
                        <option value="1">1 day</option>
                        <option value="2">1 week</option>
                        <option value="3">1 month</option>
                        <option value="4">6 months</option>
                        <option value="5">1 year</option>
                    </Form.Select>
                    <Button
                        type="submit"
                        className="btn-light"
                    >
                        Shorten
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default URLInputArea;
