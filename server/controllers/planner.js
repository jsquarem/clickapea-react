const { addRecipeToPlannerDocument, getPlannerDocumentByProfileID } = require('../services/plannerService');

const index = async (req, res) => {
  const profileID = req.user.profile;
  try {
    const plannerDocument = await getPlannerDocumentByProfileID(profileID);
    res.status(201).json(plannerDocument);
  } catch (err) {
    res.status(500).json({ err });
  }
};

const add = async (req, res) => {
  try {
    const input = {
      profileID: req.user.profile,
      recipeID: req.body.recipeID,
      date: req.body.date,
    }
    const plannerDocument = await addRecipeToPlannerDocument(input);
    res.status(201).json(plannerDocument);
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  index,
  add,
};
