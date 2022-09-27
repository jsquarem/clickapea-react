const Recipe = require('../models/recipe');
const Profile = require('../models/profile');
const Planner = require('../models/planner');

const index = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const planners = await Planner.find({
      profile: profileID,
    }).populate({ path: 'recipes', select: '_id title' });

    //console.log(plannerEvents, '<-plannerEvents');
    res.status(201).json({ planners });
  } catch (err) {
    res.status(400).json({ err });
  }
};
