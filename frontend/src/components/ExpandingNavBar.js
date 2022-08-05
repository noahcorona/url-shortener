import {Nav, Navbar} from 'react-bootstrap';
import {FaBook, FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

// eslint-disable-next-line react/prop-types
const ExpandingNavBar = ({isOnBottom, onDocClick}) => {
  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Navbar.Brand href="#">
        <span className="Brand-Items">
          <b>smlr</b>
          <p>sometimes, smaller <i>is</i> better</p>
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
            Support the developer
            <SiBuymeacoffee className="Expanding-Nav-Link-Icon" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExpandingNavBar;
