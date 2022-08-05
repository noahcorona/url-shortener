import {Button, Modal} from "react-bootstrap";

const DocModal = ({show, handleClose}) => {
    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Using the smlr API</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>API URL</h3>
                <p>https://smlr.org/api/</p>
                <h3>Making a Request</h3>
                <p>https://smlr.org/api/{"{your_url_here}"}</p>
                <h3>Example Response</h3>
                <p>The response is formatted as a JSON object</p>
                <p>https://smlr.org/api/{"{your_url_here}"}</p>
                <h3>Javascript example</h3>
                <p>Code here</p>
                <h3>Python example</h3>
                <p>Code here</p>
            </Modal.Body>
            <Modal.Footer>
                <a href="https://github.com/noahcorona/url-shortener/issues/new">
                    <Button variant="dark">
                        Submit an issue on Github
                    </Button>
                </a>
            </Modal.Footer>
        </Modal>
    )
}

export default DocModal;
