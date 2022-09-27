// const Profile = require('../models/profile');
const Recipe = require('../models/recipe');
// const RecipeBook = require('../models/recipeBook');

const index = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const recipes = await Recipe.find({
      profile: profileID,
    });
    res.status(201).json({ recipes });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getRecipes = async (req, res) => {
  console.log(req.body, '<-rec.body');
  const recipeIDs = req.body;
  const multiplier = 1;
  try {
    const recipeDocuments = await Recipe.find({
      _id: {
        $in: recipeIDs,
      },
    }).populate('extendedIngredients');
    const trimRecipeList = recipeDocuments.map((recipe) => {
      return {
        title: recipe.title,
        servings: recipe.servings,
        ingredients: recipe.extendedIngredients,
      };
    });
    const ingredientsList = [];
    trimRecipeList.forEach((recipe) => {
      recipe.ingredients.forEach((recipeIngredient) => {
        let titleCaseName = '';
        const i = ingredientsList.findIndex(
          (ingredient) => ingredient.aisle === recipeIngredient.aisle
        );
        if (i > -1) {
          const j = ingredientsList[i].ingredients.findIndex(
            (ingredient) => ingredient.name === recipeIngredient.name
          );
          if (j > -1) {
            ingredientsList[i].ingredients[j].amountMetric +=
              recipeIngredient.measures.metric.amount * multiplier;
            ingredientsList[i].ingredients[j].amountUS +=
              recipeIngredient.measures.us.amount * multiplier;
          } else {
            titleCaseName = recipeIngredient.name
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ');
            ingredientsList[i].ingredients.push({
              name: titleCaseName,
              unitMetric: recipeIngredient.measures.metric.unitShort,
              unitUS: recipeIngredient.measures.us.unitShort,
              amountMetric:
                recipeIngredient.measures.metric.amount * multiplier,
              amountUS: recipeIngredient.measures.us.amount * multiplier,
            });
          }
        } else {
          if (recipeIngredient.aisle && recipeIngredient.aisle !== '?') {
            titleCaseName = recipeIngredient.name
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ');
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
    console.log(ingredientsList, '<-ingredientsList');
    res.status(201).send(ingredientsList);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
};

const getNewRecipeImages = async (req, res) => {
  console.log('here');
  try {
    const recipeURLs = await Recipe.find({})
      .sort('-createdAt')
      .limit(25)
      .select('image title');
    console.log(recipeURLs, '<-recipes');
    res.status(201).json({ recipeURLs });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  index,
  getRecipes,
  getNewRecipeImages,
};
