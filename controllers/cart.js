const Recipe = require('../models/recipe');
const Profile = require('../models/profile');
const Planner = require('../models/planner');

const index = async (req, res) => {
  const profileID = req.user.profile._id;
  try {
    const plannerDocuments = await Planner.find({
      profile: profileDocument,
    });
    console.log(plannerDocuments, '<-plannerDocuments');

    // res.status(201).json({ err });
    res.status(201).json({ plannerDocument });
  } catch (err) {
    res.status(400).json({ err });
  }
};
