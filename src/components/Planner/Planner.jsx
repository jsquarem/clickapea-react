import update from 'immutability-helper';
import { memo, useCallback, useState, useEffect } from 'react';
import { NativeTypes } from 'react-dnd-html5-backend';
//import { Box } from '../PlannerRecipes/PlannerRecipes.jsx';
import { PlannerCalendar } from '../PlannerCalendar/PlannerCalendar.jsx';
import { PlannerRecipes } from '../PlannerRecipes/PlannerRecipes.jsx';
import { ItemTypes } from './ItemTypes.js';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';

export const Planner = memo(function Planner() {
  const [loading, setLoading] = useState(false);
  const [recipeBooks, setRecipeBooks] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      recipeBookAPI.getBooks().then((response) => {
        setRecipeBooks(response.recipeBooks);
        setLoading(false);
      });
    } catch (err) {}
  }, []);

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook?.recipes?.map((recipe) => {
      return (
        <ListGroup.Item className="draggable-recipe" key={recipe._id}>
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
        <Accordion.Header>{recipeBook.name}</Accordion.Header>
        <Accordion.Body>{recipeComponents}</Accordion.Body>
      </Accordion.Item>
    );
  });

  return (
    <div className="row">
      <div className="col-4">
        <h3 className="mb-4 pb-2">Recipe Books</h3>
        <Accordion>{recipeBooksComponent}</Accordion>
      </div>
      <div className="col-8">
        <PlannerCalendar accept={'recipe'} />
      </div>
    </div>
  );
});
