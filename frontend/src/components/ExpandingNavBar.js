import {Nav, Navbar} from 'react-bootstrap';
import {FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

// eslint-disable-next-line react/prop-types
const ExpandingNavBar = ({isOnBottom, onDocClick}) => {
  return (
    <Navbar
      collapseOnSelect
      bg="light"
      expand="lg"
      variant="light"
    >
      <Navbar.Brand href="#">
        <span className="Brand-Items">
          <b>smlr</b>
          <p>sometimes, smaller is better</p>
        </span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" onClick={onDocClick}>API</Nav.Link>
          <Nav.Link href="https://github.com/noahcorona/url-shortener">
            <FaGithub />
          </Nav.Link>
          <Nav.Link href="https://buymeacoffee.com/4IeSH91kr">
            <SiBuymeacoffee />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExpandingNavBar;
