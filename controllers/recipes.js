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

module.exports = {
  index,
};
