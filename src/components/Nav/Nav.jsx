import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function NavBar({ user }) {
  return (
    <Navbar bg="light" expand="lg">
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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/recipes/import">Import Recipe</Nav.Link>
            {user && <Nav.Link href="/recipes/books">Recipe Books</Nav.Link>}
            {user && <Nav.Link href="/calendar">Calendar</Nav.Link>}
            {user && <Nav.Link href="/planner">Planner</Nav.Link>}
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Button href="/signup">Signup</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
