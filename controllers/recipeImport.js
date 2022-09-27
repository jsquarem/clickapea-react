require('dotenv').config();
const RecipeBook = require('../models/recipeBook');
const Equipment = require('../models/equipment');
const Ingredient = require('../models/ingredient');
const RecipeURL = require('../models/recipeURL');
const Profile = require('../models/profile');
const Recipe = require('../models/recipe');
const {
  Cuisine,
  DishType,
  Diet,
  Occaision,
} = require('../models/recipeTaxonomy');
const ingredient = require('../models/ingredient');
require('url').URL;

const parseSpoonResponse = (data, callType = '') => {
  if (callType == 'recipe') return data;
  return false;
};

const addRecipeToDB = async (recipeData, recipeURLDocument) => {
  // const profileID = req.user.profile._id;
  // const profileDocument = await Profile.findById(profileID);
  // console.log(profileDocument, '<-profileDocument');
  const newRecipe = parseSpoonResponse(recipeData, 'recipe');
  const privacyObj = {
    public: true,
    owner: null,
  };
  let recipeDocument = await Recipe.findOne({
    recipeURL: recipeURLDocument._id,
    'privacy.owner': null,
  }).populate('ingredients cuisines dishTypes diets occasions equipment');
  if (recipeDocument) {
    console.log('found it!!!!!!!');
    return recipeDocument;
  }
  // if exists in response then get or create, else initialize empty
  // ingredients
  const extendedIngredientRaws = newRecipe.extendedIngredients;
  let ingredientDocuments = [];
  if (extendedIngredientRaws)
    ingredientDocuments = await getIngredients(extendedIngredientRaws);
  // cuisines
  const cuisineRaws = newRecipe.cuisines;
  let cuisinesDocuments = [];
  if (cuisineRaws) cuisinesDocuments = await getCuisines(cuisineRaws);
  // dishTypes
  const dishTypeRaws = newRecipe.dishTypes;
  let dishTypeDocuments = [];
  if (dishTypeRaws) dishTypeDocuments = await getDishTypes(dishTypeRaws);
  // diets
  const dietRaws = newRecipe.diets;
  let dietDocuments = [];
  if (dietRaws) dietDocuments = await getDiets(dietRaws);
  // occasions
  const occasionRaws = newRecipe.occasions;
  let occasionDocuments = [];
  if (occasionRaws) occasionDocuments = await getOccasions(occasionRaws);
  const analyzedInstructionsRaw = newRecipe.analyzedInstructions;
  let equipmentDocuments = [];
  if (analyzedInstructionsRaw)
    equipmentDocuments = await getEquipment(analyzedInstructionsRaw);
  // build recipe object
  newRecipe.recipeURL = recipeURLDocument;
  newRecipe.privacy = privacyObj;
  newRecipe.ingredients = ingredientDocuments;
  newRecipe.cuisines = cuisinesDocuments;
  newRecipe.dishTypes = dishTypeDocuments;
  newRecipe.diets = dietDocuments;
  newRecipe.occasions = occasionDocuments;
  newRecipe.equipment = equipmentDocuments;
  //console.log(newRecipe, '<-newRecipe');
  recipeDocument = await Recipe.create(newRecipe);
  recipeDocument = await recipeDocument.populate(
    'ingredients cuisines dishTypes diets occasions equipment'
  );
  return recipeDocument;
};

const getEquipment = async (analyzedInstructionRaws) => {
  console.log('found equipment');
  console.log(analyzedInstructionRaws[0], '<-analyzedInstructionRaws[0]');
  const equipmentDocumentsRaw = [];
  for (const instruction of analyzedInstructionRaws[0].steps) {
    if (!instruction.equipment) continue;
    for (const equipment of instruction.equipment) {
      let equipmentDocument = await Equipment.findOne({ id: equipment.id });
      if (!equipmentDocument) {
        console.log(equipment, '<-equipmentDocument');
        equipmentDocument = await Equipment.create(equipment);
      }
      equipmentDocumentsRaw.push(equipmentDocument);
    }
  }
  const uniqueIds = [];
  const equipmentDocuments = equipmentDocumentsRaw.filter((equipment) => {
    const isDuplicate = uniqueIds.includes(equipment.id);
    if (!isDuplicate) {
      uniqueIds.push(equipment.id);
      return true;
    }
    return false;
  });

  console.log(equipmentDocuments, '<-equipmentDocuments');
  return equipmentDocuments;
};

const getOccasions = async (occasionRaws) => {
  const occasionDocuments = [];
  for (const occasion of occasionRaws) {
    let occasionDocument = await Occaision.findOne({ name: occasion });
    if (!occasionDocument) {
      occasionDocument = await Occaision.create({ name: occasion });
    }
    occasionDocuments.push(occasionDocument);
  }
  return occasionDocuments;
};

const getDiets = async (dietRaws) => {
  const dietDocuments = [];
  for (const diet of dietRaws) {
    let dietDocument = '';
    dietDocument = await Diet.findOne({ name: diet });
    if (!dietDocument) {
      dietDocument = await Diet.create({ name: diet });
    }
    dietDocuments.push(dietDocument);
  }
  return dietDocuments;
};

const getDishTypes = async (dishTypeRaws) => {
  const dishTypeDocuments = [];
  for (const dishType of dishTypeRaws) {
    let dishTypeDocument = '';
    dishTypeDocument = await DishType.findOne({ name: dishType });
    if (!dishTypeDocument) {
      dishTypeDocument = await DishType.create({ name: dishType });
    }
    dishTypeDocuments.push(dishTypeDocument);
  }
  return dishTypeDocuments;
};

const getCuisines = async (cuisineRaws) => {
  const cuisineDocuments = [];
  for (const cuisine of cuisineRaws) {
    let cuisineDocument = '';
    cuisineDocument = await Cuisine.findOne({ name: cuisine });
    if (!cuisineDocument) {
      cuisineDocument = await Cuisine.create({ name: cuisine });
    }
    cuisineDocuments.push(cuisineDocument);
  }
  return cuisineDocuments;
};

const getIngredients = async (extendedIngredientsRaw) => {
  const ingredientDocuments = [];
  for (const extendedIngredient of extendedIngredientsRaw) {
    let ingredientObj = {
      id: extendedIngredient.id,
      aisle: extendedIngredient.aisle,
      image: extendedIngredient.image,
      consistency: extendedIngredient.consistency,
      name: extendedIngredient.name,
    };
    let ingredientDocument = await Ingredient.findOne({
      id: extendedIngredient.id,
    });
    if (!ingredientDocument) {
      ingredientDocument = await Ingredient.create(ingredientObj);
    }
    ingredientDocuments.push(ingredientDocument);
  }
  return ingredientDocuments;
};

const addRecipeURL = async (searchRecipeURLObj) => {
  const newRecipeURLObj = {
    url: searchRecipeURLObj.href,
    origin: searchRecipeURLObj.origin,
    hostname: searchRecipeURLObj.hostname,
    pathname: searchRecipeURLObj.pathname,
    searchParams: searchRecipeURLObj.searchParams,
  };
  try {
    const newRecipeURLDocument = await RecipeURL.create(newRecipeURLObj);
    return newRecipeURLDocument;
  } catch (err) {
    console.log(err);
  }
};

const getRecipeURL = async (recipeURL) => {
  let newUrl = false;
  try {
    const recipeURLDocument = await RecipeURL.findOne({ url: recipeURL.url });
    //console.log(recipeURLDocument, '<-recipeURLDocument');
    if (recipeURLDocument) return [recipeURLDocument, newUrl];

    const searchRecipeURLObj = new URL(recipeURL);
    const constructedRecipeURL =
      searchRecipeURLObj.origin + searchRecipeURLObj.pathname;
    try {
      const constructedRecipeURLDocument = await RecipeURL.findOne({
        origin: searchRecipeURLObj.origin,
        pathname: searchRecipeURLObj.pathname,
      });
      if (constructedRecipeURLDocument) {
        return [constructedRecipeURLDocument, newUrl];
      }
      const newRecipeURLDocument = await addRecipeURL(searchRecipeURLObj);
      newUrl = true;
      return [newRecipeURLDocument, newUrl];
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

// const baseUrl = https://api.spotify.com/v1

const requestData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data, '<-data');
    return data;
  } catch (error) {
    console.log(err);
    return res
      .status(500)
      .json({ message: 'Failed to fetch 3rd party API Data' });
  }
};

const addRecipe = async (req, res) => {
  //console.log(req, '<-req');
  console.log(req.body, '<-req.body');
  const profileID = req.body.profile;
  const profileDocument = await Profile.findById(profileID);
  console.log(profileDocument, '<-profileDocument');
  const recipeURLRaw = req.body.url;
  console.log(recipeURLRaw, '<-recipeURLRaw');
  try {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
        'X-RapidAPI-Host':
          'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      },
    };
    const extractAPIURL = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/extract?analyze=true&includeTaste=true`;

    let recipe = {};
    //console.log(await getRecipeURL(recipeURLRaw), '<-getRecipeURL');
    const [recipeURLDocument, newRecipe] = await getRecipeURL(recipeURLRaw);
    //console.log(newRecipe, '<-newRecipe');
    if (newRecipe) {
      const recipeRequestURL = `${extractAPIURL}&url=${
        recipeURLDocument.origin + recipeURLDocument.pathname
      }`;
      console.log(recipeRequestURL, '<-recipeRequestURL');
      const recipeData = await requestData(recipeRequestURL, options);
      //console.log(recipeData, '<-added');
      if (
        recipeData.preparationMinutes == -1 &&
        recipeData.cookingMinutes == -1
      ) {
        return res.status(503).json({
          error: 'Could not find valid recipe',
        });
      }
      recipe = await addRecipeToDB(recipeData, recipeURLDocument);
      console.log('added one');
    } else {
      recipe = await Recipe.findOne({
        recipeURL: recipeURLDocument._id,
      }).populate('ingredients cuisines dishTypes diets occasions equipment');
      console.log('found one');
      //console.log(recipe, '<-recipe');
    }
    recipeBookDocuments = await RecipeBook.find({ owner: profileDocument });
    //console.log(recipeBookDocuments, '<-recipeBookDocuments');
    //console.log(await addRecipeToDB(RecipeData, recipeURL), '<-addRecipeToDB');

    const sendResponse = {
      recipe,
      profile: profileDocument,
      recipeBooks: recipeBookDocuments,
    };
    console.log(JSON.stringify(sendResponse), '<-sendResponse');
    return res.status(201).json({
      recipe,
      profile: profileDocument,
      recipeBooks: recipeBookDocuments,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const index = async (req, res) => {
  const recipe = {};
  let recipeBookDocuments = [];
  const profileID = req.user.profile._id;
  const profileDocument = await Profile.findById(profileID);
  console.log(profileDocument, '<-profileDocument');
  return res.render('searchURL', {
    recipe,
    profile: profileDocument,
    recipeBooks: recipeBookDocuments,
  });
};

module.exports = {
  index,
  addRecipe,
};
