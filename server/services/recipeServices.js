require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
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
  Occasion,
} = require('../models/recipeTaxonomy');

//=========== Helper functions =====================//

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
        const ingredientInAisleIndex = ingredientsList[
          aisleIndex
        ].ingredients.findIndex(
          (ingredient) => ingredient.name === recipeIngredient.name
        );
        // If ingredient exists in aisle, add current ingredient measurement amount to existing amount
        if (ingredientInAisleIndex > -1) {
          ingredientsList[aisleIndex].ingredients[
            ingredientInAisleIndex
          ].amountMetric +=
            recipeIngredient.measures.metric.amount * multiplier;
          ingredientsList[aisleIndex].ingredients[
            ingredientInAisleIndex
          ].amountUS += recipeIngredient.measures.us.amount * multiplier;
        } else {
          // Capitalize all ingredient names
          titleCaseName = recipeIngredient.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
          // Else add new ingredient to existing aisle
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
          // Else add new aisle with new ingredient
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

const addRecipeToDB = async (recipeData, recipeURLDocument) => {
  const privacyObj = {
    public: true,
    owner: null,
  };
  let recipeDocument = await Recipe.findOne({
    recipeURL: recipeURLDocument._id,
    'privacy.owner': null,
  }).populate('ingredients cuisines dishTypes diets occasions equipment');
  if (recipeDocument) {
    return recipeDocument;
  }
  // if exists in response then get or create, else initialize empty
  // ingredients
  const extendedIngredientRaws = recipeData.extendedIngredients;
  let ingredientDocuments = [];
  if (extendedIngredientRaws)
    ingredientDocuments = await getIngredients(extendedIngredientRaws);
  // cuisines
  const cuisineRaws = recipeData.cuisines;
  let cuisinesDocuments = [];
  if (cuisineRaws) cuisinesDocuments = await getCuisines(cuisineRaws);
  // dishTypes
  const dishTypeRaws = recipeData.dishTypes;
  let dishTypeDocuments = [];
  if (dishTypeRaws) dishTypeDocuments = await getDishTypes(dishTypeRaws);
  // diets
  const dietRaws = recipeData.diets;
  let dietDocuments = [];
  if (dietRaws) dietDocuments = await getDiets(dietRaws);
  // occasions
  const occasionRaws = recipeData.occasions;
  let occasionDocuments = [];
  if (occasionRaws) occasionDocuments = await getOccasions(occasionRaws);
  const analyzedInstructionsRaw = recipeData.analyzedInstructions;
  let equipmentDocuments = [];
  if (analyzedInstructionsRaw)
    equipmentDocuments = await getEquipment(analyzedInstructionsRaw);
  // build recipe object
  recipeData.recipeURL = recipeURLDocument;
  recipeData.privacy = privacyObj;
  recipeData.ingredients = ingredientDocuments;
  recipeData.cuisines = cuisinesDocuments;
  recipeData.dishTypes = dishTypeDocuments;
  recipeData.diets = dietDocuments;
  recipeData.occasions = occasionDocuments;
  recipeData.equipment = equipmentDocuments;
  recipeDocument = await Recipe.create(recipeData);
  recipeDocument = await recipeDocument.populate(
    'ingredients cuisines dishTypes diets occasions equipment'
  );
  return recipeDocument;
};

const getEquipment = async (analyzedInstructionRaws) => {
  const equipmentDocumentsRaw = [];
  for (const instruction of analyzedInstructionRaws[0].steps) {
    if (!instruction.equipment) continue;
    for (const equipment of instruction.equipment) {
      let equipmentDocument = await Equipment.findOne({ id: equipment.id });
      if (!equipmentDocument) {
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
  return equipmentDocuments;
};

const getOccasions = async (occasionRaws) => {
  const occasionDocuments = [];
  console.log(occasionRaws, '<-occasionRaws');
  for (const occasion of occasionRaws) {
    console.log(occasion, '<-occasion');
    let occasionDocument = await Occasion.findOne({ name: occasion });
    if (!occasionDocument) {
      occasionDocument = await Occasion.create({ name: occasion });
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
    if (recipeURLDocument) return [recipeURLDocument, newUrl];
    const searchRecipeURLObj = new URL(recipeURL);
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

const requestData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Failed to fetch 3rd party API Data' });
  }
};

//=========== Responds to controller =================//

const getIngredientsByRecipeID = async (recipeIDs) => {
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

const findOneOrCreate = async (req) => {
  console.log('findOneOrCreate');
  if (req.params.query.startsWith('http')) {
    const recipeURLRaw = req.params.query;
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
      const [recipeURLDocument, newRecipe] = await getRecipeURL(recipeURLRaw);

      // console.log(recipeURLDocument, '<-recipeURLDocument');
      console.log(newRecipe, '<-newRecipe');
      if (newRecipe) {
        const recipeRequestURL = `${extractAPIURL}&url=${
          recipeURLDocument.origin + recipeURLDocument.pathname
        }`;
        const recipeData = await requestData(recipeRequestURL, options);
        console.log(recipeData, '<-recipeData');
        // if (
        //   recipeData.preparationMinutes == -1 &&
        //   recipeData.cookingMinutes == -1
        // ) {
        //   return res.status(503).json({
        //     error: 'Could not find valid recipe',
        //   });
        // }
        recipe = await addRecipeToDB(recipeData, recipeURLDocument);
      } else {
        recipe = await Recipe.findOne({
          recipeURL: recipeURLDocument._id,
        }).populate('ingredients cuisines dishTypes diets occasions equipment');
        if (!recipe) {
          console.log(recipeURLDocument, '<-recipeURLDocument');
          await RecipeURL.deleteOne({ _id: recipeURLDocument._id });
        }
      }
      if ('profile' in req.body) {
        const profileID = req.body.profile;
        const profileDocument = await Profile.findById(profileID);
        recipeBookDocuments = await RecipeBook.find({ owner: profileDocument });
      } else {
        profileDocument = null;
        recipeBookDocuments = [];
      }
      const sendResponse = {
        recipe,
        profile: profileDocument,
        recipeBooks: recipeBookDocuments,
      };
      return {
        recipe,
        profile: profileDocument,
        recipeBooks: recipeBookDocuments,
      };
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('yup it broke');
    return new Error('malformed query url');
  }
};

module.exports = {
  getIngredientsByRecipeID,
  findOneOrCreate,
};
