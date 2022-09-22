const mongoose = require('mongoose');

const recipeBookSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    mealPlan: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('RecipeBook', recipeBookSchema);
