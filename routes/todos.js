const Todo = require('../models/todo_model');
const express = require('express');
const router = express.Router();

// GET list of todos /todos
router.get('/', (req, res) => {
	Todo.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

// GET show todo /todos/:id
router.get('/:id', (req, res) => {
	let id = req.params.id;
	Todo.findById(id, (err, todo) => {
		res.json(todo);
	});
});

// POST create todo /todos/add
router.post('/add', (req, res) => {
	// create new instance of Todo
	let todo = new Todo(req.body);
	// save created Todo to database
	todo
		.save()
		.then((todo) => {
			res.status(200).json({ todo: 'todo added successfully' });
		})
		.catch((err) => {
			res.status(400).send('adding new todo failed');
		});
});

// POST update todo /todos/update/:id
router.post('/update/:id', (req, res) => {
	Todo.findById(req.params.id, (err, todo) => {
		if (!todo) {
			res.status(404).send('data is not found!');
		} else {
			todo.todo_description = req.body.todo_description;
			todo.todo_responsible = req.body.todo_responsible;
			todo.todo_priority = req.body.todo_priority;
			todo.todo_completed = req.body.todo_completed;

			// save updated Todo to database
			todo
				.save()
				.then((todo) => {
					res.json('Todo updated');
				})
				.catch((err) => {
					res.status(400).send('Update not possible!');
				});
		}
	});
});

// DELETE destroy todo /todos/:id
router.delete('/:id', async(req, res) => {
	let _id = req.params.id;
	
	try {
		const todo = await Todo.findByIdAndDelete({_id});
		res.json(todo);
	} catch(e) {
		return res.status(400).json({
			mensaje: 'Ocurrio un error',
			error
		})
	}
});

module.exports = router;
