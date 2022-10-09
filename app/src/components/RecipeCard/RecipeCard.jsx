import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import IngredientList from '../../components/IngredientList/IngredientList';
import RecipeExtras from '../../components/RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import RecipeInstructions from '../RecipeInstructions/RecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';
import './RecipeCard.css';

export default function RecipeCard({ recipeObject, user }) {
  const [recipeExtras, setRecipeExtras] = useState({});

  useEffect(() => {
    console.log(recipeObject, '<-recipeObject');
    if (recipeObject.recipe) {
      setRecipeExtras({
        preparationMinutes: recipeObject.recipe.preparationMinutes,
        cookingMinutes: recipeObject.recipe.cookingMinutes,
        readyInMinutes: recipeObject.recipe.readyInMinutes,
        vegetarian: recipeObject.recipe.vegetarian,
        vegan: recipeObject.recipe.vegan,
        glutenFree: recipeObject.recipe.glutenFree,
        dairyFree: recipeObject.recipe.dairyFree,
        veryHealthy: recipeObject.recipe.veryHealthy,
        taste: recipeObject.recipe.taste,
      });
    }
  }, []);

  return recipeObject.recipe ? (
    <>
      <div className="row recipe-header">
        <div
          className="col-12 p-3 rounded"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0)) , url('${recipeObject.recipe.image}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <h1 className="text-center text-white">
                {recipeObject.recipe.title}
              </h1>
              <AddToRecipeBookButton
                recipeID={recipeObject.recipe._id}
                user={user}
              />
              <div className="row">
                <div className="col-3">
                  <img src="https://catcollection7-11.s3.us-east-2.amazonaws.com/up-arrow.png" />{' '}
                </div>
                <div className="col-7 mt-5 text-center">
                  <span className="text-white h4 pt-5 text-center">
                    Add recipe to a recipebook to build a&nbsp;
                    <Link className="recipe-link" to="/planner">
                      Planner
                    </Link>
                    &nbsp;or&nbsp;
                    <Link className="recipe-link" to="/list">
                      Shopping List
                    </Link>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 recipe-ingredients bordered rounded">
              <IngredientList
                ingredients={recipeObject.recipe.extendedIngredients}
              />
              <RecipeExtras recipeExtras={recipeExtras} />
            </div>
          </div>
        </div>
        <div className="equipment-list bg-white bordered rounded mt-3 py-3">
          <EquipmentList equipmentList={recipeObject.recipe.equipment} />
        </div>
      </div>
      <div className="row">
        <RecipeInstructions
          recipeInstructions={recipeObject.recipe.analyzedInstructions}
        />
      </div>
    </>
  ) : (
    <h1 className="text-center mt-5 pt-5">Unable to import recipe</h1>
  );
}
