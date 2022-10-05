const router = require('express').Router();
const recipeController = require('../../controllers/recipes');

router.post('/search', recipeController.getIngredients);
router.get('/search/new', recipeController.getNewRecipeImages);
router.get('/search/:query', recipeController.searchRecipes);
router.get('/search/find/:recipeID', recipeController.getRecipeByID);

router.get('/import/:query', recipeController.getRecipeByURL);

module.exports = router;
