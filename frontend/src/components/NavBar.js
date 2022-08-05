import {FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

// eslint-disable-next-line react/prop-types
const NavBar = ({onDocClick}) => {
  return (
    <div className="Navigation">
      <div className="Navigation-Content">
        <div>
          <a
            href="#"
            className="Navigation-Link"
          >
                        smlr
          </a>
          <p>Sometimes, smaller is better</p>
        </div>
        <div className="Navigation-Button-Area">
          <a
            className="Navigation-Button"
            href="#"
            onClick={onDocClick}
          >
                        API
          </a>
          <a
            className="Navigation-Button-Icon"
            href="https://github.com/noahcorona/url-shortener"
          >
            <FaGithub />
          </a>
          <a
            className="Navigation-Button-Icon"
            href="https://buymeacoffee.com/4IeSH91kr"
          >
            <SiBuymeacoffee />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
