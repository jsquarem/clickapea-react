import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Check } from 'react-bootstrap-icons';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import './AddRecipeBookButton.css';
import { addRecipe } from '../../utils/recipeAPI';

export default function AddToRecipeBookButton({ recipeID }) {
  const [recipeBooks, setRecipeBooks] = useState(null);
  const [loading, setLoading] = useState(false);

  const getRecipeBooks = async () => {
    const responseRecipeBooks = await recipeBookAPI.getBooks();
    return responseRecipeBooks;
  };

  useEffect(() => {
    getRecipeBooks().then((response) => {
      console.log(response.recipeBooks, '<-response.recipeBooks');
      setRecipeBooks(response.recipeBooks);
    });
  }, []);

  // useEffect(() => {
  //   getRecipeBooks();
  // },[])

  const handleBookAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target.parentNode, '<-e.target');
    const url = `${e.target.parentNode.parentNode.id}/add/${recipeID}`;
    console.log(url, '<-url');
    // console.log(e.target.id, '<-e.target.id');
    // console.log(recipeID, '<-recipeID');
    recipeBookAPI.addRecipeToBook(url).then(() => {
      getRecipeBooks().then((response) => {
        console.log(response.recipeBooks, '<-response.recipeBooks - add');
        setRecipeBooks(response.recipeBooks);
      });
    });
  };
  return recipeBooks && recipeID ? (
    <div className="col-8 offset-2 d-grid text-center">
      <DropdownButton
        as={ButtonGroup}
        id="dropdown-button-drop-recipe-book"
        size="lg"
        title="Add to Recipe Book"
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
                {checkmark ? (
                  <div className="col-3 text-center">Added</div>
                ) : (
                  ''
                )}
              </div>
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  ) : (
    ''
  );
}

{
  /* <a class="dropdown-item disabled" href="/recipe-books/<%= recipeBooks[index]._id %>/add/<%= recipe._id %>">
  <i class="bi bi-check float-right text-success"></i><%= recipeBooks[index].name %>
</a> */
}
