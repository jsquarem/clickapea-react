const express = require('express');
const router = require('express').Router();
const plannerController = require('../../controllers/planner');

router.post('/', plannerController.index);
router.post('/add', plannerController.add);

module.exports = router;
