const Todo = require('../models/todo_model');

module.exports = {
	postDestroy(req, res, next) {
		let todo = Todo.findById(req.params.id);
		todo.remove();
		res.redirect('/');
	}
};
