const router = require('express').Router();
const recipeBookController = require('../../controllers/recipeBooks');

router.get('/', recipeBookController.getRecipeBooks);
router.post('/', recipeBookController.createRecipeBook);

router.get(
  '/:recipeBookID/add/:recipeID',
  recipeBookController.addRecipeToBook
);

module.exports = router;
