const Profile = require('../models/profile');
const Planner = require('../models/planner');

const index = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const profileDocument = await Profile.findById(profileID);
    const plannerEvents = await Planner.find({
      profile: profileDocument,
    }).populate({ path: 'recipes', select: '_id title' });
    res.status(201).json({ plannerEvents });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const add = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const existingPlannerDocument = await Planner.findOne({
      date: req.body.date,
      profile: profileID,
    });
    if (existingPlannerDocument) {
      try {
        existingPlannerDocument.recipes.push(req.body.recipeID);
        existingPlannerDocument.save();
        res.status(201).json({ existingPlannerDocument });
      } catch (err) {
        res
          .status(401)
          .json({ err: 'Failed to add recipe to existing planner' });
      }
    } else {
      const plannerObject = {
        date: req.body.date,
        profile: profileID,
        recipes: [req.body.recipeID],
      };
      const plannerDocument = await Planner.create(plannerObject);
      res.status(201).json({ plannerDocument });
    }
  } catch (err) {
    res.status(400).json({ err: 'Failed to add planner to database' });
  }
};

module.exports = {
  index,
  add,
};
