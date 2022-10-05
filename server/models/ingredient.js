const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  aisle: {
    type: String,
  },
  image: {
    type: String,
  },
  consistency: {
    type: String,
  },
  name: {
    type: String,
  },
});
module.exports = mongoose.model('Ingredient', ingredientSchema);
