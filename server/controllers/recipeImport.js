const Profile = require('../models/profile');
require('url').URL;
const recipeServices = require('../services/recipeServices');

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

// const index = async (req, res) => {
//   const recipe = {};
//   let recipeBookDocuments = [];
//   const profileID = req.user.profile._id;
//   const profileDocument = await Profile.findById(profileID);
//   return res.render('searchURL', {
//     recipe,
//     profile: profileDocument,
//     recipeBooks: recipeBookDocuments,
//   });
// };

module.exports = {
  // index,
  getRecipeByURL,
};
