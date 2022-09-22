import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useEffect } from 'react';
import IngredientList from '../../components/IngredientList/IngredientList';
import RecipeImage from '../../components/RecipeImage/RecipeImage';
import RecipeExtras from '../../components/RecipeExtras/RecipeExtras';
import EquipmentList from '../EquipmentList/EquipmentList';
import RecipeInstructions from '../RecipeInstructions/RecipeInstructions';
import AddToRecipeBookButton from '../AddToRecipeBookButton/AddToRecipeBookButton';

export default function RecipeCard({ recipeObject, recipeBooksObject }) {
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [recipeImage, setRecipeImage] = useState(null);
  const [recipeExtras, setRecipeExtras] = useState(null);
  const [recipeName, setRecipeName] = useState(null);
  const [equipmentList, setEquipmentList] = useState(null);
  const [recipeInstructions, setRecipeInstructions] = useState(null);
  const [recipeBooks, setRecipeBooks] = useState(null);
  // console.log(recipeObject, '<-recipeObject');

  useEffect(() => {
    setRecipe(recipeObject.recipe);
  }, []);

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.extendedIngredients);
      setRecipeImage(recipe.image);
      setRecipeName(recipe.title);
      setEquipmentList(recipe.equipment);
      setRecipeInstructions(recipe.analyzedInstructions[0].steps);
      setRecipeBooks(recipeBooksObject);
      setRecipeExtras({
        preparationMinutes: recipe.preparationMinutes,
        cookingMinutes: recipe.cookingMinutes,
        readyInMinutes: recipe.readyInMinutes,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        dairyFree: recipe.dairyFree,
        veryHealthy: recipe.veryHealthy,
        taste: recipe.taste,
      });
    }
  }, [recipe]);
  // console.log(recipe, '<-recipe');

  return (
    <>
      <div className="row">
        {recipeBooks ? <AddToRecipeBookButton recipeBooks={recipeBooks} /> : ''}
        {recipeName ? <h3 className="text-center">{recipeName}</h3> : ''}
        <div className="col-12 col-md-6">
          {recipeImage ? <RecipeImage recipeImage={recipeImage} /> : ''}
        </div>
        <div className="col-12 col-md-6">
          {ingredients ? <IngredientList ingredients={ingredients} /> : ''}
          {recipeExtras ? <RecipeExtras recipeExtras={recipeExtras} /> : ''}
        </div>
      </div>
      <div className="row">
        {equipmentList ? <EquipmentList equipmentList={equipmentList} /> : ''}
      </div>
      <div className="row">
        {recipeInstructions ? (
          <RecipeInstructions recipeInstructions={recipeInstructions} />
        ) : (
          ''
        )}
      </div>
    </>
  );
}
