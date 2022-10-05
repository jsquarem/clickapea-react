import { memo, useState, useEffect } from 'react';
import { PlannerCalendar } from '../PlannerCalendar/PlannerCalendar.jsx';
import { PlannerRecipes } from '../PlannerRecipes/PlannerRecipes.jsx';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import './Planner.css';

export const Planner = memo(function Planner() {
  const [recipeBooks, setRecipeBooks] = useState([]);

  useEffect(() => {
    try {
      recipeBookAPI.getBooks().then((response) => {
        setRecipeBooks(response.recipeBooks);
      });
    } catch (err) {}
  }, []);

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook?.recipes?.map((recipe) => {
      return (
        <ListGroup.Item className="p-0" key={recipe._id}>
          <PlannerRecipes
            image={recipe.image}
            name={recipe.title}
            recipeID={recipe._id}
            type="recipe"
          />
        </ListGroup.Item>
      );
    });
    return (
      <Accordion.Item eventKey={recipeBook._id} key={recipeBook._id}>
        <Accordion.Header>
          <h4 className="p-0 m-0">{recipeBook.name}</h4>
        </Accordion.Header>
        <Accordion.Body className="p-0">{recipeComponents}</Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <div className="row my-3">
      <h1 className="text-center">Meal Planner</h1>
      <hr />
      <div className="col-4 my-3">
        <h2 className="mb-1">Recipe Books</h2>
        <Accordion>{recipeBooksComponent}</Accordion>
      </div>
      <div className="col-8 my-3">
        <PlannerCalendar accept={'recipe'} />
      </div>
    </div>
  );
});
