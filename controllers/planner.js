const Profile = require('../models/profile');
const Planner = require('../models/planner');

const index = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const profileDocument = await Profile.findById(profileID);
    const plannerEvents = await Planner.find({
      profile: profileDocument,
    }).populate({ path: 'recipes', select: '_id title' });

    //console.log(plannerEvents, '<-plannerEvents');
    res.status(201).json({ plannerEvents });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const add = async (req, res) => {
  console.log(req.user, '<-req.user');
  console.log(req.body, '<-req.body');
  const profileID = req.user.profile;
  try {
    const profileDocument = await Profile.findById(profileID);
    console.log(profileDocument, '<-profileDocument add');

    const existingPlannerDocument = await Planner.findOne({
      date: req.body.date,
      profile: profileDocument,
    });
    console.log(existingPlannerDocument, '<-existingPlannerDocument');
    const plannerObject = {
      date: req.body.date,
      profile: profileDocument,
      recipes: [req.body.recipeID],
    };
    const plannerDocument = await Planner.create(plannerObject);
    res.status(201).json({ plannerDocument });
  } catch (err) {
    res.status(400).json({ err });
  }
};

module.exports = {
  index,
  add,
};
