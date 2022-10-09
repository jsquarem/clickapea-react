import React, { useState } from 'react';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import { Check } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import './AddRecipeBookButton.css';

export default function AddToRecipeBookButton({ recipeID, user }) {
  const [recipeBooks, setRecipeBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addBook, setAddBook] = useState(false);
  const [bookName, setBookName] = useState({
    name: '',
  });

  const updateRecipeBooks = async () => {
    const recipeBookResponse = await recipeBookAPI.getBooks();
    // console.log(recipeBookResponse)
    setRecipeBooks(recipeBookResponse);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      updateRecipeBooks();
    }
  }, [loading]);

  const handleBookChange = (e) => {
    e.stopPropagation();
    setBookName({ [e.target.name]: e.currentTarget.value });
  };

  const handleBookAdd = async (e) => {
    e.preventDefault();
    setRecipeBooks([]);
    const url = `${e.target.parentNode.parentNode.id}/add/${recipeID}`;
    await recipeBookAPI.addRecipeToBook(url);
    setLoading(true);
  };

  const handleBookCreateForm = (e) => {
    setAddBook(true);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBookCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recipeBookResponse = await recipeBookAPI.create(bookName);
      if (recipeBooks) {
        setRecipeBooks([...recipeBooks, recipeBookResponse.recipeBookDocument]);
      } else {
        setRecipeBooks([recipeBookResponse.recipeBookDocument]);
      }
      setBookName({ name: '' });
      setAddBook(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleBookCancel = (e) => {
    e.preventDefault();
    setAddBook(false);
  };

  return recipeBooks.length > 0 ? (
    <DropdownButton
      style={{ minWidth: '100%' }}
      as={ButtonGroup}
      id="dropdown-button-drop-recipe-book"
      size="lg"
      title="Add to Recipe Book"
      variant="primary text-white"
    >
      {recipeBooks.map((recipeBook, i) => {
        let checkmarkClass = '';
        let checkmark = '';
        let unchecked = 'book-name';
        if (recipeBook.recipes.find((recipe) => recipe._id === recipeID)) {
          checkmark = <Check />;
          checkmarkClass = 'text-success disabled';
          unchecked = '';
        }
        return (
          <Dropdown.Item
            style={{ minWidth: '100%' }}
            eventKey={i}
            key={i}
            onClick={handleBookAdd}
            className={checkmarkClass}
            id={recipeBook._id}
          >
            <div className="row">
              <div className={`col-9 ${unchecked}`}>
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
        onChange={(e) => e.stopPropagation()}
        className="book-form"
      >
        {addBook && user ? (
          <div
            className="input-group"
            onKeyDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            onFocus={(e) => e.stopPropagation()}
            onMouseOver={(e) => e.stopPropagation()}
            onChange={(e) => e.stopPropagation()}
          >
            <Form.Control
              autoFocus
              type="text"
              name="name"
              placeholder="Create New Book"
              onChange={handleBookChange}
              value={bookName.name}
            />
            <ButtonGroup className="me-2">
              <Button
                onClick={handleBookCreate}
                variant="success"
                className="book-create text-white"
              >
                Create
              </Button>
              <Button
                onClick={handleBookCancel}
                variant="danger"
                className="book-cancel text-white"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        ) : user ? (
          <span className="instructions-text">
            Click to Create Another Recipe Book
          </span>
        ) : (
          <span className="instructions-text">
            Login to create a recipe book
          </span>
        )}
      </Dropdown.Item>
    </DropdownButton>
  ) : user ? (
    <DropdownButton
      as={ButtonGroup}
      id="dropdown-button-drop-recipe-book"
      size="lg"
      title="Add to Recipe Book"
      style={{ minWidth: '100%' }}
      variant="primary text-white"
    >
      <Dropdown.Item
        style={{ minWidth: '100%' }}
        eventKey={0}
        onClick={handleBookCreateForm}
        onChange={(e) => e.stopPropagation()}
        className="book-form text-white"
      >
        {addBook && user ? (
          <div className="input-group" onKeyDown={(e) => e.stopPropagation()}>
            <Form.Control
              autoFocus
              type="text"
              name="name"
              placeholder="Create New Book"
              onChange={handleBookChange}
              value={bookName.name}
            />
            <ButtonGroup className="me-2">
              <Button
                onClick={handleBookCreate}
                variant="success"
                className="book-create text-white"
              >
                Create
              </Button>
              <Button
                onClick={handleBookCancel}
                variant="danger"
                className="book-cancel text-white"
              >
                Cancel
              </Button>
            </ButtonGroup>
          </div>
        ) : user ? (
          <span className="instructions-text">
            Add a recipe book to save this recipe!
          </span>
        ) : (
          <span className="instructions-text">
            Login to create a recipe book
          </span>
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
      variant="primary text-white"
    >
      <Dropdown.Item
        style={{ minWidth: '100%' }}
        as={Link}
        to="/login"
        eventKey={0}
        className="book-form"
      >
        <span className="instructions-text">Login to create a recipe book</span>
      </Dropdown.Item>
    </DropdownButton>
  );
}
