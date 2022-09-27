import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

export default function HomePage() {
  const [recipeURL, setRecipeURL] = useState({ url: '' });
  function handleChange(e) {
    setRecipeURL({ ...recipeURL, url: e.target.value });
  }
  return (
    <>
      <header>
        <img src="https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg" />
        <section>
          <h1
            className="text-center mb-5"
            style={{
              fontFamily: `'Caveat', cursive`,
              fontSize: '5rem',
              textShadow: '2px 2px 5px #abbfc2',
            }}
          >
            Welcome to Clickapea!
          </h1>
          <h5>Paste a recipe URL or search by name</h5>
          <Form className="form header-form">
            <Form.Group className="mb-3" controlId="recipeImport">
              <div className="input-group input-group-lg">
                <Form.Control
                  type="text"
                  placeholder="https://example.com/recipe/"
                  name="recipeURL"
                  value={recipeURL.url}
                  onChange={handleChange}
                />
                <LinkContainer to="/recipes/import" state={recipeURL}>
                  <Button variant="primary text-white" type="submit">
                    Create
                  </Button>
                </LinkContainer>
              </div>
            </Form.Group>
          </Form>
        </section>
      </header>
    </>
  );
}
