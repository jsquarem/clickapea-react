const router = require('express').Router();
const recipeBookController = require('../../controllers/recipeBooks');

router.get('/', recipeBookController.index);
router.post('/', recipeBookController.create);

router.get('/:recipeBookID/add/:recipeID', recipeBookController.add);

module.exports = router;
