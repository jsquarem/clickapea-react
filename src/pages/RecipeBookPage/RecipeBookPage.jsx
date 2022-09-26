import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import * as recipeAPI from '../../utils/recipeAPI';
import { useEffect } from 'react';
import RecipeBooks from '../../components/RecipeBooks/RecipeBooks';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead.bs5.css';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function RecipeBookPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(0);
  const [recipeBooks, setRecipeBooks] = useState(null);
  const [newRecipeBook, setNewRecipeBook] = useState({});
  const [recipeBook, setRecipeBook] = useState({
    name: '',
  });
  const [recipe, setRecipe] = useState('');
  const [selections, setSelections] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (selections.length > 3) {
      recipeAPI.searchRecipes(selections).then((response) => {
        setOptions(response);
      });
    }
  }, [selections]);

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
    setRecipe(recipe);
  }

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
          <Form.Group>
            <Form.Label>Single Selection</Form.Label>
            <Typeahead
              id="basic-typeahead-single"
              labelKey="name"
              onChange={setSelections}
              options={options}
              placeholder="Choose a state..."
              selected={selections}
            />
          </Form.Group>
        </Form>
      </div>
      {recipeBooks && !loading ? <RecipeBooks recipeBooks={recipeBooks} /> : ''}
    </div>
  );
}
