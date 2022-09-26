const express = require('express');
const router = require('express').Router();
const plannerController = require('../../controllers/planner');

router.post('/', plannerController.index);
// router.get('/:recipeBookID/add/:recipeID', recipeBookController.add);
router.post('/add', plannerController.add);

module.exports = router;
