import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';

export default function RecipeBooks({ recipeBooks }) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [recipeBookList, setRecipeBookData] = useState([]);
  // const [recipeBookData, setRecipeBookData] = useState('');
  // useEffect(() => {
  //   setRecipeBooksList(recipeBooks);
  // }, [recipeBookList]);
  const makeRecipeComponents = (recipeBook) => {
    console.log('make ', recipeBook.recipes.length, ' recipes');
    return recipeBook?.recipes?.map((recipe) => {
      return (
        <ListGroup.Item key={recipe._id}>
          <a
            href={`/recipes/${recipe._id}`}
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            <div className="d-flex w-100 align-items-center">
              <div className="col-2 col-lg-1 text-center">
                <img
                  style={{ 'max-height': '40px' }}
                  src={recipe.image}
                  alt=""
                />
              </div>
              <div className="col-10 col-lg-11 px-2">
                <h5 className="m-0">{recipe.title}</h5>
              </div>
            </div>
          </a>
        </ListGroup.Item>
      );
    });
  };

  const recipeBooksComponent = recipeBooks?.recipeBooks?.map((recipeBook) => {
    const recipeComponents = makeRecipeComponents(recipeBook);
    return (
      <Accordion.Item eventKey={recipeBook._id} key={recipeBook._id}>
        <Accordion.Header>{recipeBook.name}</Accordion.Header>
        {recipeComponents}
      </Accordion.Item>
    );
  });

  // const MakeRecipeBook = (recipeBooks) => {
  //   const recipeBookAccordians = [];
  //   console.log(recipeBooks);
  //   console.log(recipeBooks.recipeBooks, '<-recipeBooks.recipeBooks');
  //   if (recipeBooks.recipeBooks.length > 0) {
  //     recipeBooks.recipeBooks?.map((recipeBook, index) => {
  //       console.log(recipeBook, '<-recipeBook');
  //       recipeBookAccordians.push(recipeBook);
  //       // <Accordion.Item eventKey={index}>
  //       //   <Accordion.Header>{recipeBook.name}</Accordion.Header>
  //       // </Accordion.Item>;
  //     });
  //   }
  //   console.log(recipeBookAccordians, '<-recipeBookAccordians');
  //   return recipeBookAccordians;
  // };
  //console.log(MakeRecipeBook(recipeBooks), '<-recipeBooks');
  return (
    <div className="row">
      <div className="col-12 col-md-6">
        <Accordion>{recipeBooksComponent}</Accordion>
      </div>
    </div>
  );
}
