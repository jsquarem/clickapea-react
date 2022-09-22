import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import IngredientList from '../../components/IngredientList/IngredientList';
import { useEffect } from 'react';

export default function RecipeCard({ recipeObject }) {
  const [state, setState] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [instructions, setInstructions] = useState();
  // console.log(recipeObject, '<-recipeObject');

  useEffect(() => {
    setRecipe(recipeObject.recipe);
  }, []);

  useEffect(() => {
    if (recipe) {
      setIngredients(recipe.extendedIngredients);
    }
    // console.log(ingredients, '<-ingredients');
  }, [recipe]);
  // console.log(recipe, '<-recipe');

  return (
    <div className="row">
      <div className="col-12 col-lg-6 mt-4"></div>
      {ingredients ? <IngredientList ingredients={ingredients} /> : ''}
    </div>
  );
}
