import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Accordion from 'react-bootstrap/Accordion';
import { ListGroup } from 'react-bootstrap';

export default function RecipeBooks({ recipeBooks }) {
  //   const [error, setError] = useState('');
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [recipeBookList, setRecipeBookData] = useState([]);

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook?.recipes?.map((recipe) => {
      return (
        <ListGroup.Item key={recipe._id}>
          <a
            href={`/recipes/${recipe._id}`}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-100 align-items-center">
              <div className="col-2 col-lg-1 text-center">
                <img style={{ maxHeight: '40px' }} src={recipe.image} alt="" />
              </div>
              <div className="col-10 col-lg-11 px-2">
                <h5 className="m-0">{recipe.title}</h5>
              </div>
            </div>
          </a>
        </ListGroup.Item>
      );
    });
    return (
      <Accordion.Item eventKey={recipeBook._id} key={recipeBook._id}>
        <Accordion.Header>{recipeBook.name}</Accordion.Header>
        {recipeComponents}
      </Accordion.Item>
    );
  });
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <Accordion>{recipeBooksComponent}</Accordion>
      </div>
    </div>
  );
}
