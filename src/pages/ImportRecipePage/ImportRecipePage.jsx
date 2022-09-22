import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as recipeAPI from '../../utils/recipeAPI';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import RecipeCard from '../../components/RecipeCard/RecipeCard';

export default function ImportRecipePage({ user }) {
  const [error, setError] = useState('');
  const [recipeURL, setRecipeURL] = useState({ url: '' });
  const [recipeObject, setRecipeObject] = useState(null);
  const [recipeBooksObject, setRecipeBooksObject] = useState(null);

  const handleRecipeImport = async (e) => {
    e.preventDefault();
    try {
      console.log(recipeURL, '<---recipeURL');
      recipeURL.profile = user.profile;
      console.log(recipeURL);
      const responseRecipe = await recipeAPI.addRecipe(recipeURL);
      const responseRecipeBooks = await recipeBookAPI.getBooks();
      setRecipeBooksObject(responseRecipeBooks.recipeBooks);
      setRecipeObject(responseRecipe);
      setRecipeURL({ url: '' });
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleChange(e) {
    setRecipeURL({ ...recipeURL, url: e.target.value });
  }

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-12">
          <Form className="form" onSubmit={handleRecipeImport}>
            <Form.Group className="mb-3" controlId="recipeImport">
              <Form.Label>
                Import a new recipe!
                <br />
                https://tastesbetterfromscratch.com/pork-chile-verde/
              </Form.Label>
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
        </div>
      </div>
      <div className="row">
        {recipeObject && recipeBooksObject ? (
          <RecipeCard
            recipeObject={recipeObject}
            recipeBooksObject={recipeBooksObject}
          />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
