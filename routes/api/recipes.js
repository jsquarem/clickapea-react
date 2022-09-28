const express = require('express');
const router = require('express').Router();
const recipeImportController = require('../../controllers/recipeImport');
const recipeBookController = require('../../controllers/recipeBooks');
const recipeController = require('../../controllers/recipes');

router.get('/search/profile/:profileID', recipeController.index);
router.get('/search/new', recipeController.getNewRecipeImages);
router.post('/search', recipeController.getRecipes);

router.get('/import/:query', recipeImportController.addRecipe);

//Books
router.get('/books', recipeBookController.index);
router.get('/books/:recipeBookID/add/:recipeID', recipeBookController.add);
router.post('/books', recipeBookController.create);

module.exports = router;
