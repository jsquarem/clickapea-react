const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    recipeURL: { type: mongoose.Schema.Types.ObjectId, ref: 'RecipeURL' },
    privacy: {
      public: {
        type: Boolean,
        default: true,
      },
      owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    },
    vegetarian: {
      type: Boolean,
      default: false,
    },
    vegan: {
      type: Boolean,
      default: false,
    },
    glutenFree: {
      type: Boolean,
      default: false,
    },
    dairyFree: {
      type: Boolean,
      default: false,
    },
    veryHealthy: {
      type: Boolean,
      default: false,
    },
    cheap: {
      type: Boolean,
      default: false,
    },
    veryPopular: {
      type: Boolean,
      default: false,
    },
    sustainable: {
      type: Boolean,
      default: false,
    },
    lowFodmap: {
      type: Boolean,
      default: false,
    },
    weightWatcherSmartPoints: {
      type: Number,
      default: null,
    },
    gaps: {
      type: String,
      default: null,
    },
    preparationMinutes: {
      type: Number,
      default: null,
    },
    cookingMinutes: {
      type: Number,
      default: null,
    },
    aggregateLikes: {
      type: Number,
      default: null,
    },
    healthScore: {
      type: Number,
      default: null,
    },
    creditsText: {
      type: String,
      default: null,
    },
    sourceName: {
      type: String,
      default: null,
    },
    pricePerServing: {
      type: Number,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    readyInMinutes: {
      type: Number,
      default: null,
    },
    servings: {
      type: Number,
      default: null,
    },
    sourceUrl: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    imageType: {
      type: String,
      default: null,
    },
    summary: {
      type: String,
      default: null,
    },
    instructions: {
      type: String,
      default: null,
    },
    originalId: {
      type: Number,
      default: null,
    },
    taste: {},
    extendedIngredients: [],
    equipment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipment' }],
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    cuisines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cuisine' }],
    dishTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DishType' }],
    diets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Diet' }],
    occasions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Occasion' }],
    analyzedInstructions: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Recipe', recipeSchema);
