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
                        <option value="1">A year</option>
                        <option value="2">6 months</option>
                        <option value="3">3 months</option>
                        <option value="4">A month</option>
                        <option value="5">A Week</option>
                        <option value="6">A Day</option>
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
