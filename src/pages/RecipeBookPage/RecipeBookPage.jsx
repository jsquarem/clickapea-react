import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import { useEffect } from 'react';
import RecipeBooks from '../../components/RecipeBooks/RecipeBooks';

export default function RecipeBookPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(0);
  const [recipeBooks, setRecipeBooks] = useState(null);
  const [newRecipeBook, setNewRecipeBook] = useState({});
  const [recipeBook, setRecipeBook] = useState({
    name: '',
  });
  const [recipe, setRecipe] = useState('');

  useEffect(() => {
    setLoading(true);
    try {
      recipeBookAPI.getBooks().then((response) => {
        setRecipeBooks(response.recipeBooks);
        setLoading(false);
      });
    } catch (err) {}
  }, [newRecipeBook]);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await recipeBookAPI
        .create(recipeBook)
        .then((response) => {
          setRecipeBooks([response.recipeBook, recipeBooks]);
          setNewRecipeBook(response.recipeBook);
          setLoading(false);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  function handleChangeBook(e) {
    setRecipeBook({ ...recipeBook, name: e.target.value });
  }
  function handleChangeRecipe(e) {
    //setRecipe(recipe);
  }

  //   TODO:
  //   async function handleSearch(e) {
  //   e.preventDefault();

  //   try {
  //     await userService.login(state);
  //     // Route to wherever you want!
  //     navigate('/');
  //   } catch (err) {
  //     // Invalid user data (probably duplicate email)
  //     // this is from the throw block in the userService.login first then function
  //     setError(err.message);
  //   }
  // }

  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <Form className="form" onSubmit={handleCreate}>
          <Form.Group className="mb-3" controlId="recipeBookName">
            <Form.Label>Create a new Recipe Book</Form.Label>
            <div className="input-group">
              <Form.Control
                type="text"
                placeholder="ex. Quick Pizza"
                name="recipeBookName"
                value={recipeBook.name}
                onChange={handleChangeBook}
              />
              <Button variant="outline-secondary" type="submit">
                Create
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
      <div className="col-12 col-md-6">
        <Form className="form">
          <Form.Group className="mb-3" controlId="recipeSearch">
            <Form.Label>Search for recipes in our database</Form.Label>
            <Form.Control
              type="text"
              placeholder="Start typing..."
              name="recipeSearch"
              value={recipe}
              onChange={handleChangeRecipe}
            />
          </Form.Group>
        </Form>
      </div>
      {recipeBooks && !loading ? <RecipeBooks recipeBooks={recipeBooks} /> : ''}
    </div>
  );
}
