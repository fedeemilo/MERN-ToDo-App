import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import TodosList from './components/TodosList';
import AppNav from './components/AppNav';

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container text-center text-white'>
					<AppNav />
					<Route path='/' exact component={TodosList} />
					<Route path='/edit/:id' component={EditTodo} />
					<Route path='/create' component={CreateTodo} />
				</div>
			</Router>
		);
	}
}

export default App;
