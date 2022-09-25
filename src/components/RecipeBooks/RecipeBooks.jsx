import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup } from 'react-bootstrap';
// import Draggable, { DraggableCore } from 'react-draggable';
import './RecipeBooks.css';

export default function RecipeBooks({ recipeBooks, draggable }) {
  //   const [error, setError] = useState('');
  //   const [isLoading, setIsLoading] = useState(true);
  const [isDraggable, setIsDraggable] = useState(!!draggable);
  //const [isDragging, setIsDragging] = useState(false);

  const handleStart = (e) => {
    console.log(e, '<-handleStart');
    //setIsDragging(true);
  };
  const handleDrag = (e) => {
    console.log(e, '<-handleDrag');
  };
  const handleStop = (e) => {
    console.log(e, '<-handleStop');
    //setIsDragging(false);
  };

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook?.recipes?.map((recipe) => {
      return isDraggable ? (
        // <Draggable key={recipe._id} onStart={handleStart} onStop={handleStop}>
        <ListGroup.Item className="draggable-recipe">
          {/* <a
              href={`/recipes/${recipe._id}`}
              className="list-group-item list-group-item-action"
              aria-current="true"
            > */}
          <div className="d-flex w-100 align-items-center">
            <div className="col-2 text-center">
              <img
                style={{ maxHeight: '40px', maxWidth: '40px' }}
                src={recipe.image}
                alt=""
              />
            </div>
            <div className="col-10 col-lg-11 px-2">
              <span>{recipe.title}</span>
            </div>
          </div>
          {/* </a> */}
        </ListGroup.Item>
      ) : (
        // </Draggable>
        <ListGroup.Item key={recipe._id}>
          <a
            href={`/recipes/${recipe._id}`}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-100 align-items-center">
              <div className="col-2 text-center">
                <img
                  style={{ maxHeight: '40px', maxWidth: '40px' }}
                  src={recipe.image}
                  alt=""
                />
              </div>
              <div className="col-10 col-lg-11 px-2">
                <span>{recipe.title}</span>
              </div>
            </div>
          </a>
        </ListGroup.Item>
      );
    });
    return (
      <Accordion.Item eventKey={recipeBook._id} key={recipeBook._id}>
        <Accordion.Header>{recipeBook.name}</Accordion.Header>
        <Accordion.Body>{recipeComponents}</Accordion.Body>
      </Accordion.Item>
    );
  });
  return (
    <>
      <h3 className="mb-4 pb-2">Recipe Books</h3>
      <Accordion>{recipeBooksComponent}</Accordion>
    </>
  );
}
