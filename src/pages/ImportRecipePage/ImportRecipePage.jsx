import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [recipeURL, setRecipeURL] = useState({ url: '' });
  const [recipeObject, setRecipeObject] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (location.state && location.state.url) {
      setRecipeURL({ url: location.state.url });
      setLoading(true);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      getRecipe(recipeURL).then((response) => {
        setRecipeObject(response);
        setLoading(false);
      });
    }
  }, [loading]);

  const getRecipe = async (url) => {
    const responseRecipe = await recipeAPI.addRecipe(recipeURL);
    setRecipeURL({ url: '' });
    console.log(responseRecipe, '<-responseRecipe');
    return responseRecipe;
  };

  const handleRecipeImport = (e) => {
    e.preventDefault();
    try {
      setRecipeURL({ ...recipeURL, profile: user.profile });
      setLoading(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleChange(e) {
    setRecipeURL({ ...recipeURL, url: e.target.value });
  }

  return (
    <Container style={{ minHeight: '73vh' }}>
      <div className="row">
        <div className="col-8 offset-2 mt-5">
          <Form className="form" onSubmit={handleRecipeImport}>
            <Form.Group className="mb-3" controlId="recipeImport">
              <Form.Label>
                Import a new recipe!
                <br />
                https://tastesbetterfromscratch.com/pork-chile-verde/
              </Form.Label>
              <div className="input-group input-group-lg">
                <Form.Control
                  type="text"
                  placeholder="https://example.com/recipe/"
                  name="recipeURL"
                  value={recipeURL.url}
                  onChange={handleChange}
                />
                <Button variant="outline-secondary" type="submit">
                  Find
                </Button>
              </div>
            </Form.Group>
          </Form>
        </div>
      </div>
      {loading ? <RecipeLoading /> : ''}
      {recipeObject && !loading ? (
        <RecipeCard recipeObject={recipeObject} />
      ) : (
        ''
      )}
    </Container>
  );
}
