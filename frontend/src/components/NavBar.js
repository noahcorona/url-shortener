import {FaBook, FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

const NavBar = ({onDocClick}) => {
  return (
    <div className="Navigation-Desktop">
      <div className="Navigation-Content">
        <div>
          <a
            href="/"
            className="Navigation-Link"
          >
            smlr
          </a>
        </div>
        <div className="Navigation-Button-Area">
          <a
            className="Navigation-Button"
            href="#"
            onClick={onDocClick}
          >
            <span>API</span>
            <FaBook className="Navigation-Button-Icon" />
          </a>
          <a
            className="Navigation-Button"
            href="https://github.com/noahcorona/url-shortener"
          >
            <span>Github</span>
            <FaGithub className="Navigation-Button-Icon" />
          </a>
          <a
            className="Navigation-Button"
            href="https://buymeacoffee.com/4IeSH91kr"
          >
            <span>Donate</span>
            <SiBuymeacoffee className="Navigation-Button-Icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
