const mongoose = require('mongoose');

const recipeURLSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  hostname: {
    type: String,
    required: true,
  },
  pathname: {
    type: String,
    required: true,
  },
  searchParams: {
    type: {},
  },
});

module.exports = mongoose.model('RecipeURL', recipeURLSchema);
