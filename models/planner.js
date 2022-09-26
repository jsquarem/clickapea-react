const mongoose = require('mongoose');

const PlannerSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
});
module.exports = mongoose.model('Planner', PlannerSchema);
