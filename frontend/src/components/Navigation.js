import {BrowserView, MobileView} from 'react-device-detect';
import NavBar from './NavBar';
import ExpandingNavBar from './ExpandingNavBar';
import {useEffect, useState} from 'react';

const Navigation = ({onDocClick}) => {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    /**
     * Resize update handler to track window width
     * Used to modify the navigation bar for mobile
     * devices and narrow windows
     */
    function handleWindowResize() {
      setWindowSize(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div>
      <BrowserView>
        {windowSize <= 600 ?
            <ExpandingNavBar isOnBottom={false} onDocClick={onDocClick}/> :
            <NavBar onDocClick={onDocClick}/>
        }
      </BrowserView>
      <MobileView>
        <ExpandingNavBar isOnBottom={true} onDocClick={onDocClick} />
      </MobileView>
    </div>
  );
};

export default Navigation;
