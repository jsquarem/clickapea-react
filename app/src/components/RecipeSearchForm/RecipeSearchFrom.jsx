import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';
import { AsyncTypeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import * as recipeAPI from '../../utils/recipeAPI';

export default function RecipeSearchForm({ user }) {
  const [query, setQuery] = useState({ query: '', profile: null });
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const handleChange = async (e) => {
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
        setIsLoading(true);
        const recipeResponse = await recipeAPI.searchRecipes(e);
        setIsLoading(false);
        setOptions(recipeResponse);
        setQuery({ ...query, query: e });
      }
    }
  };

  const renderMenu = (results) => {
    console.log(results, '<-result');
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
              placeholder="Enter a url or search term (3 chars min)"
              id="recipe-typeahead"
              renderMenu={renderMenu}
              minLength={3}
            />
            <div className="input-group-append">
              <LinkContainer to="/recipes" state={query}>
                <Button variant="primary text-white" type="submit">
                  Find
                </Button>
              </LinkContainer>
            </div>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}
