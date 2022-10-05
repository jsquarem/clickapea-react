const mongoose = require('mongoose');

const recipeBookSchema = new mongoose.Schema(
  {
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('RecipeBook', recipeBookSchema);
