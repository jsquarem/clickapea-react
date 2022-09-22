const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  image: {
    type: String,
  },
  localizedName: {
    type: String,
  },
  name: {
    type: String,
  },
});
module.exports = mongoose.model('Equipment', equipmentSchema);
