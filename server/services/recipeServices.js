const Recipe = require('../models/recipe');

const getManyRecipesIngredientsByRecipeID = async (recipeIDs) => {
  try {
    const recipeDocuments = await Recipe.find({
      _id: {
        $in: recipeIDs,
      },
    }).populate('extendedIngredients');
    const ingredientsList = makeIngredientsList(recipeDocuments);
    return ingredientsList;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const makeIngredientsList = (recipeDocuments) => {
  const multiplier = 1;
  // Extract data pertinent to creating the ingredient list from recipeDocuments
  const trimRecipeList = recipeDocuments.map((recipe) => {
    return {
      title: recipe.title,
      servings: recipe.servings,
      ingredients: recipe.extendedIngredients,
    };
  });
  const ingredientsList = [];
  // Loop through all recipes in list and build unique ingredient list
  trimRecipeList.forEach((recipe) => {
    recipe.ingredients.forEach((recipeIngredient) => {
      let titleCaseName = '';
      const aisleIndex = ingredientsList.findIndex(
        (ingredient) => ingredient.aisle === recipeIngredient.aisle
      );
      // If aisle exists, check if ingredient exists in aisle
      if (aisleIndex > -1) {
        const ingredientInAisleIndex = ingredientsList[aisleIndex].ingredients.findIndex(
          (ingredient) => ingredient.name === recipeIngredient.name
        );
        // If ingredient exists in aisle, add current ingredient measurement amount to existing amount
        if (ingredientInAisleIndex > -1) {
          ingredientsList[aisleIndex].ingredients[ingredientInAisleIndex].amountMetric +=
            recipeIngredient.measures.metric.amount * multiplier;
          ingredientsList[aisleIndex].ingredients[ingredientInAisleIndex].amountUS +=
            recipeIngredient.measures.us.amount * multiplier;
        } else {
          // Capitalize all ingredient names
          titleCaseName = recipeIngredient.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
          // Add new ingredient to existing aisle
          ingredientsList[aisleIndex].ingredients.push({
            name: titleCaseName,
            unitMetric: recipeIngredient.measures.metric.unitShort,
            unitUS: recipeIngredient.measures.us.unitShort,
            amountMetric: recipeIngredient.measures.metric.amount * multiplier,
            amountUS: recipeIngredient.measures.us.amount * multiplier,
          });
        }
      } else {
        const isValidAisle =
          recipeIngredient.aisle && recipeIngredient.aisle !== '?';
        if (isValidAisle) {
          // Capitalize all ingredient names
          titleCaseName = recipeIngredient.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
          // Add new aisle with new ingredient
          ingredientsList.push({
            aisle: recipeIngredient.aisle,
            ingredients: [
              {
                name: titleCaseName,
                image: recipeIngredient.image,
                unitMetric: recipeIngredient.measures.metric.unitShort,
                unitUS: recipeIngredient.measures.us.unitShort,
                amountMetric:
                  recipeIngredient.measures.metric.amount * multiplier,
                amountUS: recipeIngredient.measures.us.amount * multiplier,
              },
            ],
          });
        }
      }
    });
  });
  ingredientsList.sort((a, b) => (a.aisle > b.aisle ? 1 : -1));
  return ingredientsList;
};

module.exports = {
  getManyRecipesIngredientsByRecipeID,
};
