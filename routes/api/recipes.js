const express = require('express');
const router = require('express').Router();
const recipeImportController = require('../../controllers/recipeImport');
const recipeBookController = require('../../controllers/recipeBooks');

router.post('/import', recipeImportController.addRecipe);

//Books
router.get('/books', recipeBookController.index);
router.get('/books/:recipeBookID/add/:recipeID', recipeBookController.add);
router.post('/books', recipeBookController.create);

module.exports = router;
