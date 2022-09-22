const Profile = require('../models/profile');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const RecipeBook = require('../models/recipeBook');

const create = async (req, res) => {
  const profileID = req.user.profile;
  console.log(profileID, '<-profileID');
  const recipeBookName = req.body.name;
  let recipeBookDocument = {
    name: '',
    profile: '',
  };
  console.log(recipeBookName, '<-recipeBookName');
  try {
    console.log(recipeBookName, '<-recipeBookName');
    recipeBookDocument = await RecipeBook.findOne({
      name: recipeBookName,
      profile: profileID,
    });
    console.log(recipeBookDocument, '<--recipeBookDocument1');
    if (recipeBookDocument) {
      console.log('recipe exists');
      return res.status(409).json({ err: 'Recipe Book Exists for User' });
    }
    recipeBookDocument = {
      name: recipeBookName,
      profile: profileID,
    };
    console.log(recipeBookDocument, '<--recipeBookDocument2');
    try {
      recipeBookDocument = await RecipeBook.create(recipeBookDocument);
      console.log('created one');
      console.log(recipeBookDocument, '<-recipeBookDocument3');
      res.status(201).json({ recipeBookDocument });
    } catch (err) {
      res.status(400).json({ err });
    }
  } catch (err) {
    return res.status(400).json({ err: 'Profile not found' });
  }
};

const add = async (req, res) => {
  const recipeBookID = req.params.recipeBookID;
  const recipeID = req.params.recipeID;
  const recipeBookDocument = await RecipeBook.findOne({ _id: recipeBookID });
  console.log(recipeBookDocument, '<-recipeBookDocument');
  if (recipeBookDocument.recipes.includes(recipeID)) {
    return res.redirect(`/recipe-books`);
  }
  const recipeDocument = await Recipe.findOne({ _id: recipeID });
  console.log(recipeDocument, '<-recipeDocument');
  recipeBookDocument.recipes.push(recipeDocument);
  await recipeBookDocument.save();

  return res.redirect(`/recipe-books`);
};

const index = async (req, res) => {
  const profileID = req.user.profile._id;
  try {
    const profileDocument = await Profile.findById(profileID);
    const recipeBooks = await RecipeBook.find({
      owner: profileDocument,
    }).populate({ path: 'recipes', select: '_id title image' });
    console.log(recipeBooks, '<-recipeBookDocuments');
    return res.status(201).json({ recipeBooks });
  } catch (err) {
    return res
      .status(409)
      .json({ err: 'Coulding find profile and/or recipe book' });
  }
};

module.exports = {
  index,
  create,
  add,
};
