const Recipe = require('../models/recipe');
const recipeServices = require('../services/recipeServices');

const getIngredients = async (req, res) => {
  try {
    const recipeIDs = req.body;
    const ingredientsList = await recipeServices.getIngredientsByRecipeID(
      recipeIDs
    );
    res.status(201).send(ingredientsList);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: 'It broked' });
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
    res.status(400).json({ err: 'Broked' });
  }
};

const searchRecipes = async (req, res) => {
  try {
    const searchTerm = req.params.query;
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
    res.status(500).json({ err });
  }
};

const getRecipeByID = async (req, res) => {
  try {
    const recipeID = req.params.recipeID;
    const recipe = await Recipe.findById(recipeID).populate(
      'ingredients cuisines dishTypes diets occasions equipment'
    );
    res.status(201).json({
      recipe,
      profile: '',
      recipeBooks: [],
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

const getRecipeByURL = async (req, res) => {
  console.log('found it');
  try {
    const recipeResponseObject = await recipeServices.getRecipeByURL(req);
    console.log(recipeResponseObject, '<-recipeResponseObject');
    res.status(201).json(recipeResponseObject);
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
};

module.exports = {
  // index,
  getIngredients,
  getNewRecipeImages,
  searchRecipes,
  getRecipeByID,
  getRecipeByURL,
};
