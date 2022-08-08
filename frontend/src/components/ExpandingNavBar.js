import {Nav, Navbar} from 'react-bootstrap';
import {FaBook, FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

const ExpandingNavBar = ({onDocClick}) => {
  return (
    <Navbar
      collapseOnSelect
      bg="transparent"
      expand="lg"
      variant="light"
    >
      <Navbar.Brand href="#">
        <span className="Brand-Items">
          <a
            href="/"
            className="Navigation-Link"
          >
            <img
              src="/android-chrome-192x192.png"
              alt="logo"
              width={32}
              height={32}
              className="d-inline-block align-top"
            />
            Sometimes, smaller is better
          </a>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" onClick={onDocClick}>
            API Documentation
            <FaBook className="Expanding-Nav-Link-Icon" />
          </Nav.Link>
          <Nav.Link href="https://github.com/noahcorona/url-shortener">
            Source code
            <FaGithub className="Expanding-Nav-Link-Icon" />
          </Nav.Link>
          <Nav.Link href="https://buymeacoffee.com/4IeSH91kr">
            Support the Creator
            <SiBuymeacoffee className="Expanding-Nav-Link-Icon" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExpandingNavBar;
