import {BrowserView, MobileView} from 'react-device-detect';
import NavBar from './NavBar';
import ExpandingNavBar from './ExpandingNavBar';
import {useEffect, useState} from 'react';

// eslint-disable-next-line require-jsdoc
function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}

// eslint-disable-next-line react/prop-types
const Navigation = ({onDocClick}) => {
  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    // eslint-disable-next-line require-jsdoc
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <BrowserView>
        {windowSize.innerWidth <= 600 ?
            <ExpandingNavBar isOnBottom={false} onDocClick={onDocClick}/> :
            <NavBar onDocClick={onDocClick}/>
        }
      </BrowserView>
      <MobileView>
        <ExpandingNavBar isOnBottom={true} onDocClick={onDocClick} />
      </MobileView>
    </>
  );
};

export default Navigation;
