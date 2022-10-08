import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

export default function SignUpPage({ handleSignUpOrLogin }) {
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(true);
  const [state, setState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    newsletter: checked,
  });

  const navigate = useNavigate();

  function handleChange(e) {
    if (e.target.name === 'newsletter') {
      setState({
        ...state,
        newsletter: !checked,
      });
      setChecked(!checked);
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await userService.signup(state);
      handleSignUpOrLogin();
      navigate('/');
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  }

  return (
    <Container style={{ minHeight: '69.5vh' }}>
      <div className="col-12 col-md-4 offset-md-4 my-5">
        <h1 className="text-center mt-5">Sign Up</h1>
        <Card>
          <Card.Body>
            <Form className="form" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  value={state.firstName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  value={state.lastName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={state.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  name="passwordConfirm"
                  value={state.passwordConfirm}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check
                  type="checkbox"
                  name="newsletter"
                  label="Sign up for newsletter"
                  checked={checked}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="primary text-white" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}
