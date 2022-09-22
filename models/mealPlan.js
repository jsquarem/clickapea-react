const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
  },
});
module.exports = mongoose.model('MealPlan', mealPlanSchema);