import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';
import * as recipeAPI from '../../utils/recipeAPI';
import { useEffect } from 'react';
import RecipeBooks from '../../components/RecipeBooks/RecipeBooks';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export default function ImportRecipePage({ user }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(0);
  const [recipeURL, setRecipeURL] = useState({ url: '' });
  const [submit, setSubmit] = useState(false);
  const [recipe, setRecipe] = useState({});

  const handleRecipeImport = async (e) => {
    e.preventDefault();
    try {
      console.log(recipeURL, '<---recipeURL');
      recipeURL.profile = user.profile;
      console.log(recipeURL);
      const response = await recipeAPI.addRecipe(recipeURL);
      setRecipeURL({ url: '' });
      setRecipe(response);
      console.log(response, '<--response');
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleChange(e) {
    setRecipeURL({ ...recipeURL, url: e.target.value });
  }

  return (
    <div className="row">
      <div className="col-12 col-md-12">
        <Form className="form" onSubmit={handleRecipeImport}>
          <Form.Group className="mb-3" controlId="recipeImport">
            <Form.Label>Import a new recipe!</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="https://example.com/recipe/"
                name="recipeURL"
                value={recipeURL.url}
                onChange={handleChange}
              />
              <Button variant="outline-secondary" type="submit">
                Create
              </Button>
            </div>
          </Form.Group>
        </Form>
        <RecipeCard recipe={recipe} />
      </div>
    </div>
  );
}
