import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

export default function NavBar({ user, handleLogout }) {
  return (
    <Navbar bg="light" expand="lg" style={{ boxShadow: '0 8px 6px -6px #999' }}>
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="https://via.placeholder.com/60x40.png?text=Logo"
            alt="..."
            className="d-block img-fluid"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/recipes/import">
              <Nav.Link>Import Recipe</Nav.Link>
            </LinkContainer>
            {user && (
              <LinkContainer to="/planner">
                <Nav.Link>Planner</Nav.Link>
              </LinkContainer>
            )}
            {user && (
              <LinkContainer to="/cart">
                <Nav.Link>Shopping Cart</Nav.Link>
              </LinkContainer>
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
