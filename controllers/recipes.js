const Profile = require('../models/profile');
const Recipe = require('../models/recipe');
const RecipeBook = require('../models/recipeBook');

const index = async (req, res) => {
  const recipeID = req.params.recipeID;
  const profileID = req.user.profile._id;
  try {
    const profileDocument = await Profile.findById(profileID);
  } catch (err) {
    console.log(err);
  }

  recipeBooks.forEach((recipeBook) => {});
  console.log(recipeBooks, '<-recipeBookDocuments');
  const recipe = await Recipe.findOne({ _id: recipeID });
  console.log(recipe, '<-recipe');
  return res.render('recipes/index', {
    recipe,
    profile: profileDocument,
    recipeBooks: recipeBooks,
  });
};

module.exports = {
  index,
};
