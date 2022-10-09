const router = require('express').Router();
const plannerController = require('../../controllers/planner');

router.post('/', plannerController.getPlanners);
router.post('/add', plannerController.addRecipeToPlanner);

module.exports = router;
