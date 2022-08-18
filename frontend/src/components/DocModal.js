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
        <Modal.Title>URL Shortener API</Modal.Title>
      </Modal.Header>
      <Modal.Body className="Doc-Modal-Body">
        <h4>Request Shortened URL (POST)</h4>
        <p><b>URL:</b> https://api.smlr.org/create</p>
        <p><b>Body (JSON):</b></p>
        <JSONPretty id="json-pretty" data={{
          destination: 'https://yourlinkhere.com',
          reqExt: 'your-alias',
        }} />
        <p>
          <b>JSON property #1: destination</b><br />
          {'The URL to shorten. For example, '}
          &quot;<i>mysite.com/img/123456.png</i>&quot;
        </p>
        <p>
          <b>JSON property #2: reqExt (optional)</b><br />
          {'The requested extension, or URL alias. For example, '}
          &quot;<i>ShortLink</i>&quot;
          {' to redirect smlr.org/ShortLink to your chosen destination.'
          }
        </p>
        <h5>Example: Post via cURL</h5>
        <pre>
          <code>curl -X POST -F {'{"destination": "https://example.com"}'} https://api.smlr.org/create</code>
        </pre>
        <h5>Example: Post via JavaScript with Axios</h5>
        <pre>
          <code>
            {'async function getShortURL(url, alias) {\n' +
             '  axios.post(\'/create\', {\n' +
             '      destination: url,\n' +
             '      reqExt: alias,\n' +
             '  }).then((response) => {\n' +
             '      const {shortened, destination, ext, ' +
             'date} = response.data;\n\n' +
             '      // handle the data here - for example...\n' +
             '      console.log(\'The URL\', destination, \n' +
             '                  \'was shortened to\', shortened,\n' +
             '                  \'at\', date, \n' +
             '                  \'and was given an ' +
             'extension/alias of\', ext)\n' +
             '  })\n' +
             '}'
            }
          </code>
        </pre>
        <h5>Example: Post via Python with the requests library</h5>
        <pre>
          <code>
            {'import requests\n\n' +
             'apiURL = \'https://api.smlr.org/create\'\n' +
             'longURL = \'https://longurlhere.com\'\n' +
             'alias = \'myalias\' # optional, generated if not provided\n' +
             'body = {\'destination\': longURL, \'reqExt\': alias}\n' +
             'res = requests.post(apiURL, json = body).json()\n\n' +
             '# handle the data here - for example...\n' +
             'print(\'The URL\', res[\'destination\'], \n' +
             '      \'was shortened to\', res[\'shortened\'],\n' +
             '      \'at\', res[\'date\'], \n' +
             '      \'and was given an extension/alias of\', res[\'ext\'])'
            }
          </code>
        </pre>
        <h3>Parsing a Response</h3>
        <b>Data (JSON):</b>
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
