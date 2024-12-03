import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { currentUser } = useAuth();
  return (
    <Navbar expand="md" sticky="top" className="navBar">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Twisted Snake
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? (
              <div className="collapse-links">
                <Nav.Link as={Link} to="/game">
                  Play
                </Nav.Link>
                <Nav.Link as={Link} to="/highscore">
                  Highscore
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </div>
            ) : (
              <div className="collapse-links">
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/highscore">
                  Highscore
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
