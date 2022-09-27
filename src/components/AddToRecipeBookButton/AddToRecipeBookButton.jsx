import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Check } from 'react-bootstrap-icons';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import './AddRecipeBookButton.css';
import { addRecipe } from '../../utils/recipeAPI';

export default function AddToRecipeBookButton({ recipeID }) {
  const [recipeBooks, setRecipeBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addBook, setAddBook] = useState(false);
  const [bookName, setBookName] = useState({
    name: '',
  });

  const getRecipeBooks = () => {
    recipeBookAPI.getBooks().then((response) => {
      setRecipeBooks(response.recipeBooks);
      setLoading(false);
    });
  };

  useEffect(() => {
    getRecipeBooks();
  }, [loading]);

  // useEffect(() => {
  //   getRecipeBooks();
  // },[])
  const handleBookChange = (e) => {
    setBookName({ name: e.target.value });
  };

  const handleBookAdd = (e) => {
    e.preventDefault();
    setRecipeBooks(null);
    setLoading(true);
    const url = `${e.target.parentNode.parentNode.id}/add/${recipeID}`;
    recipeBookAPI.addRecipeToBook(url);
  };

  const handleBookCreateForm = (e) => {
    setAddBook(true);
    e.preventDefault();
    e.stopPropagation();
    //
  };

  const handleBookCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await recipeBookAPI.create(bookName).then((response) => {
        if (recipeBooks) {
          setRecipeBooks([...recipeBooks, response.recipeBookDocument]);
        } else {
          setRecipeBooks([response.recipeBookDocument]);
        }
        setLoading(false);
        setAddBook(false);
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBookCancel = (e) => {};

  return recipeBooks ? (
    <DropdownButton
      style={{ minWidth: '100%' }}
      as={ButtonGroup}
      id="dropdown-button-drop-recipe-book"
      size="lg"
      title="Add to Recipe Book"
      variant="primary text-white"
    >
      {recipeBooks.map((recipeBook, index) => {
        let checkmarkClass = '';
        let checkmark = '';
        if (recipeBook.recipes.find((recipe) => recipe._id === recipeID)) {
          checkmark = <Check />;
          checkmarkClass = 'text-success disabled';
        }
        return (
          <Dropdown.Item
            style={{ minWidth: '100%' }}
            eventKey={index}
            key={index}
            onClick={handleBookAdd}
            className={checkmarkClass}
            id={recipeBook._id}
          >
            <div className="row">
              <div className="col-9">
                {checkmark} {recipeBook.name}{' '}
              </div>
              {checkmark ? <div className="col-3 text-center">Added</div> : ''}
            </div>
          </Dropdown.Item>
        );
      })}
      <Dropdown.Item
        style={{ minWidth: '100%' }}
        eventKey={0}
        onClick={handleBookCreateForm}
        className="book-form"
      >
        {addBook ? (
          <InputGroup className="">
            <Form.Control
              autoFocus
              className=""
              placeholder="Create New Book"
              onChange={handleBookChange}
              value={bookName.name}
            />
            <ButtonGroup className="me-2">
              <Button
                onClick={handleBookCreate}
                variant="success"
                className="book-create"
              >
                Create
              </Button>
              <Button
                onClick={handleBookCancel}
                variant="danger"
                className="book-cancel"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        ) : (
          'Add a recipe book to save this recipe!'
        )}
      </Dropdown.Item>
    </DropdownButton>
  ) : (
    <DropdownButton
      as={ButtonGroup}
      id="dropdown-button-drop-recipe-book"
      size="lg"
      title="Add to Recipe Book"
      style={{ minWidth: '100%' }}
    >
      <Dropdown.Item
        style={{ minWidth: '100%' }}
        eventKey={0}
        onClick={handleBookCreateForm}
        className="book-form"
      >
        {addBook ? (
          <InputGroup className="">
            <Form.Control
              autoFocus
              className=""
              placeholder="Create New Book"
              onChange={handleBookChange}
              value={bookName.name}
            />
            <ButtonGroup className="me-2">
              <Button
                onClick={handleBookCreate}
                variant="success"
                className="book-create"
              >
                Create
              </Button>
              <Button
                onClick={handleBookCancel}
                variant="danger"
                className="book-cancel"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </InputGroup>
        ) : (
          'Add a recipe book to save this recipe!'
        )}
      </Dropdown.Item>
    </DropdownButton>
  );
}
