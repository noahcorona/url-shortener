import {Button} from 'react-bootstrap';
import {BsArrowRight} from 'react-icons/bs';
import CopyableQRCode from './CopyableQRCode';
import CopyableText from './CopyableText';

const ShortURLArea = ({status, linkData, setLinkData, windowSize}) => {
  const {ext} = linkData;

  const shortURL = 'https://smlr.org/' + ext;

  if (status === null && linkData.ext) {
    return (
      <div
        id="short-url-area"
        className="Short-URL-Area"
      >
        <div className='Short-URL-Main-Area'>
          <h3>{shortURL}</h3>
          <CopyableText shortURL={shortURL} />
        </div>
        <CopyableQRCode
          shortURL={shortURL}
          windowSize={windowSize}
        />
        <Button
          variant="secondary"
          className="d-block go-button"
          onClick={() => setLinkData(null)}
        >
          <span>Make another URL</span>
          <BsArrowRight />
        </Button>
      </div>
    );
  } else {
    return <div />;
  }
};

export default ShortURLArea;
