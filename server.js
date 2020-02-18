const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

// Importar variables de entorno

// require('dotenv').config({
// 	silent: process.env.NODE_ENV === 'production',
// 	path: './variables.env'
// });

console.log(process.env.DB_URL);

const app = express();
const PORT = process.env.PORT || 4000;

const todosRoutes = require('./routes/todos');

let Todo = require('./models/todo_model');

// app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

console.log(process.env.MONGODB_URI);

// connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todos', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', () => {
	console.log('Connected to MongoDB database successfully');
});

// mount routes
app.use('/todos', todosRoutes);

// this is to check if my app is on heroku
if (process.env.NODE_ENV === 'production') {
	// go to react client folder and grab the build directory
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// Leer localhost de variables y puerto
const host = process.env.HOST;
const port = process.env.PORT || 4000;

// listen to port
app.listen(port, host, () => {
	console.log('Server is running on Port: ' + port);
});
