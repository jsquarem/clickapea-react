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
  console.log(location);
  console.log(recipeURL, '<-recipeURL');
  const { recipeID } = useParams();
  if (recipeID) {
    console.log(recipeID, '<-recipeID');
  }

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
      getRecipe(recipeURL).then((response) => {
        console.log(response, '<-response in use effect');
        setRecipeObject(response);
        setLoading(false);
      });
    }
  }, [loading]);

  const getRecipe = async (url) => {
    console.log(url, '<-url');
    if (url.query.startsWith('http')) {
      const responseRecipe = await recipeAPI.addRecipe(url);
      setRecipeURL({ ...recipeURL, query: '' });
      // console.log(responseRecipe, '<-responseRecipe1');
      return responseRecipe;
    } else {
      const responseRecipe = await recipeAPI.findRecipe(url);
      setRecipeURL({ ...recipeURL, query: '' });
      // console.log(responseRecipe, '<-responseRecipe2');
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
    <Container style={{ minHeight: '73vh' }}>
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
