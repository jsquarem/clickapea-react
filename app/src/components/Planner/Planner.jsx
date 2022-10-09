import { memo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlannerCalendar } from '../PlannerCalendar/PlannerCalendar.jsx';
import { PlannerRecipes } from '../PlannerRecipes/PlannerRecipes.jsx';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import './Planner.css';

export const Planner = memo(function Planner() {
  const [recipeBooks, setRecipeBooks] = useState([]);

  const updateRecipeBooks = async () => {
    try {
      const recipeBooksResponse = await recipeBookAPI.getBooks();
      setRecipeBooks(recipeBooksResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateRecipeBooks();
  }, []);

  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook.recipes.map((recipe) => {
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

  return recipeBooks.length > 0 ? (
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
  ) : (
    <div className="row my-3">
      <h1 className="text-center">Meal Planner</h1>
      <hr />
      <div className="col-4 my-3">
        <h2 className="mb-1">You have no Recipe Books</h2>
        <p>
          Try adding a recipe to a recipe book by clicking the button shown
          below on the recipe page, after importing or finding a recipe.
        </p>
        <p className="text-center">
          <Link to="/recipes">Go back to the Recipe Page</Link>
        </p>
        <img
          style={{ width: '100%' }}
          src="https://catcollection7-11.s3.us-east-2.amazonaws.com/add-recipe-button.png"
        />
      </div>
      <div className="col-8 my-3">
        <PlannerCalendar accept={'recipe'} />
      </div>
    </div>
  );
});
