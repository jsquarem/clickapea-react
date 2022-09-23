import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import IngredientList from '../../components/IngredientList/IngredientList';
import RecipeImage from '../../components/RecipeImage/RecipeImage';
import RecipeExtras from '../../components/RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import RecipeInstructions from '../RecipeInstructions/RecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';

export default function RecipeCard({ recipeObject }) {
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
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col-6">
              <h2 className="text-center pt-2">{recipeObject.recipe.title}</h2>
            </div>
            <div className="col-6">
              <AddToRecipeBookButton recipeID={recipeObject.recipe._id} />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <RecipeImage recipeImage={recipeObject.recipe.image} />
        </div>
        <div className="col-12 col-md-6">
          <IngredientList
            ingredients={recipeObject.recipe.extendedIngredients}
          />
          <RecipeExtras recipeExtras={recipeExtras} />
        </div>
      </div>
      <div className="row">
        <EquipmentList equipmentList={recipeObject.recipe.equipment} />
      </div>
      <div className="row">
        <RecipeInstructions
          recipeInstructions={recipeObject.recipe.analyzedInstructions[0].steps}
        />
      </div>
    </>
  );
}
