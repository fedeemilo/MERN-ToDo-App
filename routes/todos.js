const Todo = require('../models/todo_model');
const express = require('express');
const router = express.Router();
const { asyncErrorHandler } = require('../middleware/index');
const {
	todoIndex,
	todoPost,
	todoCreate,
	todoDelete,
	todoShow
} = require('../controllers/todos');

// GET list of todos /todos
router.get('/', asyncErrorHandler(todoIndex));

// GET show todo /todos/:id
router.get('/:id', asyncErrorHandler(todoShow));

// POST create todo /todos/add
router.post('/add', asyncErrorHandler(todoPost));

// POST update todo /todos/update/:id
router.post('/update/:id', asyncErrorHandler(todoCreate));

// DELETE destroy todo /todos/:id
router.delete('/:id', asyncErrorHandler(todoDelete));

module.exports = router;
