import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { AsyncTypeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import * as recipeAPI from '../../utils/recipeAPI';

export default function HomePage({ user }) {
  const [query, setQuery] = useState({ query: '', profile: null });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  console.log(user, '<-user');
  function handleChange(e) {
    if (e.length > 2) {
      if (e.startsWith('htt')) {
        if (user) {
          setQuery({
            ...query,
            query: e,
            profile: user.profile,
          });
        } else {
          setQuery({ ...query, query: e });
        }
      } else {
        //recipe query
        setIsLoading(true);
        recipeAPI.searchRecipes(e).then((response) => {
          console.log(response, '<-response');
          setIsLoading(false);
          setOptions(response);
          setQuery({ ...query, query: e });
        });
      }
    }
  }

  const renderMenu = (results) => {
    return (
      <Menu id="typeahead-menu">
        {results.map((result, idx) => (
          <MenuItem
            key={result.label}
            onClick={() => setQuery({ query: result.value })}
            option={result}
            position={idx}
          >
            {result.label}
          </MenuItem>
        ))}
      </Menu>
    );
  };
  return (
    <>
      <header>
        <img src="https://catcollection7-11.s3.us-east-2.amazonaws.com/pexels-ella-olsson-1600.jpg" />
        <section>
          <h1
            className="text-center mb-5"
            style={{
              // fontFamily: `Indie Flower, cursive`,
              fontSize: '5rem',
              textShadow: '2px 2px 5px #abbfc2',
            }}
          >
            Welcome to Clickapea!
          </h1>
          <h3>
            Import a recipe with a URL or search our database of recipes by name
          </h3>
          <Form className="form header-form">
            <Form.Group className="mb-3" controlId="recipeImport">
              <div className="input-group input-group-lg">
                <AsyncTypeahead
                  inputProps={{
                    name: 'query',
                  }}
                  isLoading={isLoading}
                  labelKey={(option) => `${option.label}`}
                  onSearch={handleChange}
                  options={options}
                  placeholder="Enter a url or search term"
                  id="recipe-typeahead"
                  renderMenu={renderMenu}
                />
                <div className="input-group-append">
                  <LinkContainer to="/recipes/import" state={query}>
                    <Button variant="primary text-white" type="submit">
                      Find
                    </Button>
                  </LinkContainer>
                </div>
              </div>
            </Form.Group>
            <Form.Label>
              You can also select one of the newest recipes added below to get
              started.
            </Form.Label>
          </Form>
        </section>
      </header>
    </>
  );
}
