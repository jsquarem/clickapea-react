import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup } from 'react-bootstrap';
import './RecipeBooks.css';

export default function RecipeBooks({ recipeBooks, draggable }) {
  const [isDraggable, setIsDraggable] = useState(!!draggable);

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook?.recipes?.map((recipe) => {
      return isDraggable ? (
        <ListGroup.Item className="draggable-recipe">
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
        </ListGroup.Item>
      ) : (
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
