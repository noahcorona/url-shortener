import {FaBook, FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

const NavBar = ({onDocClick}) => {
  return (
    <div className="Navigation">
      <div className="Navigation-Content">
        <div>
          <a
            href="#"
            className="Navigation-Link"
          >
            <img src="/android-chrome-192x192.png" width={64} height={64} />
          </a>
          <p>Sometimes, smaller is better</p>
        </div>
        <div className="Navigation-Button-Area">
          <a
            className="Navigation-Button"
            href="#"
            onClick={onDocClick}
          >
            API <FaBook className="Navigation-Button-Icon-Alt" />
          </a>
          <a
            className="Navigation-Button-Icon"
            href="https://github.com/noahcorona/url-shortener"
          >
            <FaGithub className="Navigation-Button-Icon" />
          </a>
          <a
            className="Navigation-Button-Icon"
            href="https://buymeacoffee.com/4IeSH91kr"
          >
            <SiBuymeacoffee className="Navigation-Button-Icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
