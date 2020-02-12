const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');

const todoRoutes = express.Router();

let Todo = require('./models/todo_model');

app.use(cors());
app.use(bodyParser.json());

// connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', () => {
	console.log('Connected to MongoDB database successfully');
});

// list of todos
todoRoutes.route('/').get((req, res) => {
	Todo.find((err, todos) => {
		if (err) {
			console.log(err);
		} else {
			res.json(todos);
		}
	});
});

// show todo
todoRoutes.route('/:id').get((req, res) => {
	let id = req.params.id;
	Todo.findById(id, (err, todo) => {
		res.json(todo);
	});
});

// create todo
todoRoutes.route('/add').post((req, res) => {
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
todoRoutes.route('/update/:id').post((req, res) => {
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

// mount routes
app.use('/todos', todoRoutes);

// this is to check if my app is on heroku
if (process.env.NODE_ENV === 'production') {
    // go to react client folder and grab the build directory
    app.use(express.static('client/build'));
}

// listen to port
app.listen(PORT, () => {
	console.log('Server is running on Port: ' + PORT);
});
