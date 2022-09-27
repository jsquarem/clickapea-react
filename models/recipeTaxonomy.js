const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: String,
});
const dishTypeSchema = new mongoose.Schema({
  name: String,
});
const dietSchema = new mongoose.Schema({
  name: String,
});
const occasionSchema = new mongoose.Schema({
  name: String,
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);
const DishType = mongoose.model('DishType', dishTypeSchema);
const Diet = mongoose.model('Diet', dietSchema);
const Occasion = mongoose.model('Occasion', occasionSchema);

module.exports = {
  Cuisine,
  DishType,
  Diet,
  Occasion,
};
