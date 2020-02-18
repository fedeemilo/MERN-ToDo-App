const express		    = require('express');
const bodyParser 		= require('body-parser');
const cors			    = require('cors');
const mongoose          = require('mongoose');
const morgan            = require('morgan');
const path              = require('path');

const app               = express();
const PORT = process.env.PORT || 4000;

const todosRoutes = require('./routes/todos');

let Todo = require('./models/todo_model');

// app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

const MONGODB_URI = 'mongodb+srv://fedeemilo:gracias2020@cluster0-9zuxs.mongodb.net/todoListdb?retryWrites=true&w=majority';

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
}

// listen to port
app.listen(PORT, () => {
	console.log('Server is running on Port: ' + PORT);
});
