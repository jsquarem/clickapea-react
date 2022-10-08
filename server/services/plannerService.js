const Profile = require('./../models/profile');
const Planner = require('./../models/planner');

const getPlannerDocumentByProfileID = async (profileID) => {
    const profileDocument = await Profile.findById(profileID);
    return Planner.find({
      profile: profileDocument,
    }).populate({ path: 'recipes', select: '_id title' });
};

const addRecipeToPlannerDocument = async ({profileID, recipeID, date }) => {
    const existingPlannerDocument = await findOneOrCreate({ profileID, recipeID, date });
    existingPlannerDocument.recipes.push(recipeID);
    existingPlannerDocument.save();

    return existingPlannerDocument;
};

const findOneOrCreate = async ({ profileID, recipeID, date }) => {
    let existingPlannerDocument = await Planner.findOne({
        date,
        profile: profileID,
    });

    if (existingPlannerDocument) return existingPlannerDocument;
    return createPlannerDocument({ profileID, recipeID, date });
}

const createPlannerDocument = async ({ profileID, recipeID }) => {
    const plannerObject = {
      date: date,
      profile: profileID,
      recipes: [ recipeID ],
    };
    return Planner.create(plannerObject);
};

module.exports = {
    getPlannerDocumentByProfileID,
    addRecipeToPlannerDocument,
    createPlannerDocument,
}
