const Todo = require('../models/todo_model');

module.exports = {
	async todoIndex(req, res, next) {
		await Todo.find((err, todos) => {
			if (err) {
				console.log(err);
			} else {
				res.json(todos);
			}
		});
	},

	async todoShow (req, res)  {
		let id = req.params.id;
		await Todo.findById(id, (err, todo) => {
			res.json(todo);
		});
	},

	async todoPost(req, res, next) {
		// create new instance of Todo
		let todo = new Todo(req.body);
		// save created Todo to database
		await todo
			.save()
			.then((todo) => {
				res.status(200).json({ todo: 'todo added successfully' });
			})
			.catch((err) => {
				res.status(400).send('adding new todo failed');
			});
	},

	async todoUpdate(req, res, next) {
		await Todo.findById(req.params.id, (err, todo) => {
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
	},

	async todoDelete(req, res, next) {
		let _id = req.params.id;
		try {
			const todo = await Todo.findByIdAndDelete({ _id });
			res.json(todo);
		} catch (e) {
			return res.status(400).json({
				mensaje: 'Ocurrio un error',
				error
			});
		}
	}
};
