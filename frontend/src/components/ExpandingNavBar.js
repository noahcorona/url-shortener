import {Container, Nav, Navbar} from 'react-bootstrap';
import {FaBook, FaGithub} from 'react-icons/fa';
import {SiBuymeacoffee} from 'react-icons/si';

const ExpandingNavBar = ({onDocClick}) => {
  return (
    <Container fluid className="Navigation-Mobile">
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
      >
        <Navbar.Brand href="#">
          <span className="Brand-Items">
            <a
              href="/"
              className="Navigation-Link"
            >
            smlr
            </a>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" onClick={onDocClick}>
                API
              <FaBook className="Expanding-Nav-Link-Icon" />
            </Nav.Link>
            <Nav.Link href="https://github.com/noahcorona/url-shortener">
                Github
              <FaGithub className="Expanding-Nav-Link-Icon" />
            </Nav.Link>
            <Nav.Link href="https://buymeacoffee.com/4IeSH91kr">
                Donate
              <SiBuymeacoffee className="Expanding-Nav-Link-Icon" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default ExpandingNavBar;
