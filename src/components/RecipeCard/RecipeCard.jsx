import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import IngredientList from '../../components/IngredientList/IngredientList';
import RecipeImage from '../../components/RecipeImage/RecipeImage';
import RecipeExtras from '../../components/RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import RecipeInstructions from '../RecipeInstructions/RecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';
import './RecipeCard.css';

export default function RecipeCard({ recipeObject, user }) {
  const [recipeExtras, setRecipeExtras] = useState({});

  useEffect(() => {
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
  }, []);
  console.log(recipeObject, '<-recipeObject in recipecard');

  return (
    <>
      <div className="row recipe-header">
        <div
          className="col-12 p-3 rounded"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1)) , url('${recipeObject.recipe.image}')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        >
          <div className="row">
            <div className="col-12 col-md-6">
              <h1 className="text-center text-light">
                {recipeObject.recipe.title}
              </h1>
              <AddToRecipeBookButton
                recipeID={recipeObject.recipe._id}
                user={user}
              />
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
  );
}
