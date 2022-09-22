const Profile = require('../models/profile');
const Recipe = require('../models/recipe');
const RecipeBook = require('../models/recipeBook');

const index = async (req, res) => {
  const recipeID = req.params.recipeID;
  let profileDocument = await Profile.findOne({
    email: 'jeffjmart@gmail.com',
  });
  if (!profileDocument)
    profileDocument = await Profile.create({
      name: 'Jeff Martin',
      email: 'jeffjmart@gmail.com',
    });
  const recipeBooks = await RecipeBook.find({
    owner: profileDocument,
  });

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
