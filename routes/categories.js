const Categorie = require('../models/categorie_model');
const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index');
const {
	categorieIndex,
	categoriePost,
	categorieDelete
} = require('../controllers/categories');

// GET list of categories /categories
router.get('/', asyncErrorHandler(categorieIndex));

// POST create categorie /categories/add
router.post('/add', asyncErrorHandler(categoriePost));

// DELETE destroy categorie /categories/:id
router.delete('/:id', asyncErrorHandler(categorieDelete));

module.exports = router;
