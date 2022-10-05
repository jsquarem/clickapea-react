const express = require('express');
const router = require('express').Router();
const recipeImportController = require('../../controllers/recipeImport');
const recipeBookController = require('../../controllers/recipeBooks');
const recipeController = require('../../controllers/recipes');

// Recipes
router.get('/search/profile/:profileID', recipeController.index);
router.get('/search/new', recipeController.getNewRecipeImages);
router.get('/search/:query', recipeController.searchRecipes);
router.get('/search/find/:recipeID', recipeController.getRecipeByID);
router.post('/search', recipeController.getRecipes);
router.get('/import/:query', recipeImportController.addRecipe);

//Books
router.get('/books', recipeBookController.index);
router.get('/books/:recipeBookID/add/:recipeID', recipeBookController.add);
router.post('/books', recipeBookController.create);

module.exports = router;
