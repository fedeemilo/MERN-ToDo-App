const Todo = require('../models/todo_model');
const express = require('express');
const router = express.Router();

// list of todos
router.get('/', (req, res) => {
	Todo.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

// show todo
router.get('/:id', (req, res) => {
	let id = req.params.id;
	Todo.findById(id, (err, todo) => {
		res.json(todo);
	});
});

// create todo
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

// update todo
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

module.exports = router;


