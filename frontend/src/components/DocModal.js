import {Button, Modal} from 'react-bootstrap';
import JSONPretty from 'react-json-pretty';

const DocModal = ({show, handleClose}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Using the smlr URL creation API</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Making a Request</h4>
        <pre>
          <b>URL:</b> https://api.smlr.org/create<br />
          <b>Type:</b> POST<br />
          <code><b>Body (JSON):</b><br /></code>
        </pre>
        <JSONPretty id="json-pretty" data={{destination: 'https://yourlinkhere.com'}} />
        <h6>cURL example</h6>
        <pre>
          <code>curl -X POST -F {'{"destination": "https://example.com"}'} https://api.smlr.org/create</code>
        </pre>
        <h6>Javascript example using Axios</h6>
        <pre>
          <code>{'async function getShortURL(url) {\n' +
              '  axios.post(\'/create\', {\n' +
              '      destination: url,\n' +
              '  }).then((response) => {\n' +
              '      const {shortened, destination, ext, ' +
              'date, redirects} = response.data;\n\n' +
              '      // handle the data here - for example...\n' +
              '      console.log(\'The URL\', destination, \n' +
              '                  \'was shortened to\', shortened,\n' +
              '                  \'at\', date, \n' +
              '                  \'and was given an ' +
              'extension of\', ext' + ',\n' +
              '                  \'. The short url has been used' +
              '\', redirects, \'times.\');\n' +
              '  })\n' +
              '}'}
          </code>
        </pre>
        <h6>Python example</h6>
        <p>Code here</p>
        <h3>Parsing a Response</h3>
        <pre>
          <code><b>Data (JSON):</b><br /></code>
        </pre>
        <JSONPretty id="json-pretty" data={{
          destination: 'https://yourlinkhere.com',
        }} />
      </Modal.Body>
      <Modal.Footer>
        <a href="https://github.com/noahcorona/url-shortener/issues/new">
          <Button variant="warning">
            Submit an issue on Github
          </Button>
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default DocModal;
