const express = require('express');
const router = require('express').Router();
const recipeBookController = require('../../controllers/recipeBooks');

router.get('/', recipeBookController.index);
router.get('/:recipeBookID/add/:recipeID', recipeBookController.add);
router.post('/', recipeBookController.create);

module.exports = router;
