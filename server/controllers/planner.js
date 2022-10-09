const {
  addRecipeToPlannerDocument,
  getPlannerDocumentByProfileID,
} = require('../services/plannerService');

const getPlanners = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const plannerDocuments = await getPlannerDocumentByProfileID(profileID);
    res.status(201).json(plannerDocuments);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const addRecipeToPlanner = async (req, res) => {
  try {
    const input = {
      profileID: req.user.profile,
      recipeID: req.body.recipeID,
      date: req.body.date,
    };
    const plannerDocument = await addRecipeToPlannerDocument(input);
    res.status(201).json(plannerDocument);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getPlanners,
  addRecipeToPlanner,
};
