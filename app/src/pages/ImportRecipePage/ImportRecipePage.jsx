import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as recipeAPI from '../../utils/recipeAPI';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
import RecipeLoading from '../../components/RecipeLoading/RecipeLoading';
import Container from 'react-bootstrap/Container';

export default function ImportRecipePage({ user }) {
  const [error, setError] = useState('');
  const [recipeURL, setRecipeURL] = useState({ query: '', user });
  const [recipeObject, setRecipeObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { recipeID } = useParams();

  useEffect(() => {
    if (location.state && location.state.query) {
      setRecipeURL({ ...recipeURL, query: location.state.query });
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (recipeID) {
      setRecipeURL({ ...recipeURL, query: recipeID });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      setLoading(true);
    }
  }, [recipeID]);

  useEffect(() => {
    if (loading) {
      const updateRecipeObjectState = async (recipeURL) => {
        const recipe = await getRecipe(recipeURL);
        setRecipeObject(recipe);
        setLoading(false);
      };
      updateRecipeObjectState(recipeURL);
    }
  }, [loading]);

  const getRecipe = async (url) => {
    if (url.query.startsWith('http')) {
      const responseRecipe = await recipeAPI.addRecipe(url);
      setRecipeURL({ ...recipeURL, query: '' });
      return responseRecipe;
    } else {
      // FIXME: better error reporting, find where the 500 response is coming from check front end console
      // https://www.delish.com/cooking/recipe-ideas/recipes/a50173/chocolate-pumpkin-cheesecake-recipe/
      const responseRecipe = await recipeAPI.findRecipe(url);
      setRecipeURL({ ...recipeURL, query: '' });
      return responseRecipe;
    }
  };

  const handleRecipeImport = (e) => {
    e.preventDefault();
    try {
      setRecipeURL({ ...recipeURL });
      setLoading(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleChange(e) {
    setRecipeURL({ ...recipeURL, query: e.target.value });
  }

  return (
    <Container
      style={{ minHeight: '73vh' }}
      data-testid="recipe-import-container"
    >
      <div className="row">
        <div className="col-8 offset-2 mt-5">
          <Form className="form" onSubmit={handleRecipeImport}>
            <Form.Group className="mb-3" controlId="recipeImport">
              <div className="input-group input-group-lg">
                <Form.Control
                  type="text"
                  placeholder="Enter a url"
                  name="recipeURL"
                  value={recipeURL.query}
                  onChange={handleChange}
                  data-testid="recipe-import-input"
                />
                <Button variant="outline-success" type="submit">
                  Find
                </Button>
              </div>
              <Form.Label>
                While Clickapea supports recipe importing from 100s of sites,
                recipe formats are wildly inconsistent and the import may fail.
                If importing fails, try again with a new recipe!
              </Form.Label>
            </Form.Group>
          </Form>
        </div>
      </div>
      {loading ? <RecipeLoading /> : ''}
      {recipeObject && !loading ? (
        <RecipeCard recipeObject={recipeObject} user={user} />
      ) : (
        ''
      )}
    </Container>
  );
}