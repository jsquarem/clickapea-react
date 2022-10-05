const Recipe = require('../models/recipe');
const recipeServices = require('../services/recipeServices');

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

const getIngredients = async (req, res) => {
  try {
    const recipeIDs = req.body;
    const ingredientsList =
      await recipeServices.getManyRecipesIngredientsByRecipeID(recipeIDs);
    res.status(201).send(ingredientsList);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err });
  }
};

const getNewRecipeImages = async (req, res) => {
  try {
    const recipeURLs = await Recipe.find({})
      .sort('-createdAt')
      .limit(24)
      .select('image title');
    res.status(201).json({ recipeURLs });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const searchTerm = req.params.query;
    console.log(searchTerm, '<-trying');
    const searchResults = await Recipe.aggregate().search({
      autocomplete: {
        query: `${searchTerm}`,
        path: 'title',
        fuzzy: {
          maxEdits: 2,
        },
      },
    });
    const searchResultsArray = searchResults.map((searchResult) => {
      const searchResultObj = {
        label: searchResult.title,
        value: String(searchResult._id),
      };
      return searchResultObj;
    });
    res.status(201).json(searchResultsArray);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getRecipeByID = async (req, res) => {
  try {
    const recipeID = req.params.recipeID;
    const recipe = await Recipe.findById(recipeID).populate(
      'ingredients cuisines dishTypes diets occasions equipment'
    );
    console.log(recipe, '<-recipe');
    res.status(201).json({
      recipe,
      profile: '',
      recipeBooks: [],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  index,
  getIngredients,
  getNewRecipeImages,
  searchRecipes,
  getRecipeByID,
};
