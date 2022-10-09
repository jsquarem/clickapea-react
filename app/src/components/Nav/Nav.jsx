import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import './Nav.css';

export default function NavBar({ user, handleLogout }) {
  return (
    <Navbar bg="light" expand="lg" style={{ boxShadow: '0 8px 6px -6px #999' }}>
      <Container>
        <Navbar.Brand href="/">
          <div
            style={{
              fontFamily: `'Indie Flower', cursive`,
              fontSize: '2rem',
              textShadow: '2px 2px 5px #abbfc2',
            }}
          >
            CP
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
              /
            </span>
            <LinkContainer to="/recipes">
              <Nav.Link>Recipes</Nav.Link>
            </LinkContainer>
            {user && (
              <>
                <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
                  /
                </span>
                <LinkContainer to="/planner">
                  <Nav.Link>Planner</Nav.Link>
                </LinkContainer>
              </>
            )}
            {user && (
              <>
                <span className="d-none d-md-block align-self-center h3 pt-2 nav-span">
                  /
                </span>
                <LinkContainer to="/cart">
                  <Nav.Link>Shopping Cart</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
          {user ? (
            <Nav>
              <LinkContainer to="">
                <Button variant="danger text-white" onClick={handleLogout}>
                  Log Out
                </Button>
              </LinkContainer>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button variant="primary text-white">Signup</Button>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
