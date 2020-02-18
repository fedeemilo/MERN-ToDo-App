import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table } from 'reactstrap';

const Todo = (props) => (
	<tr>
		<td className={props.todo.todo_completed ? 'completed' : ''}>
			{props.todo.todo_description}
		</td>
		<td className={props.todo.todo_completed ? 'completed' : ''}>
			{props.todo.todo_responsible}
		</td>
		<td className={props.todo.todo_completed ? 'completed' : ''}>
			{props.todo.todo_priority}
		</td>
		<td>
			<Link to={'/edit/' + props.todo._id} className='mr-2 text-warning'>
				Edit
			</Link>
			<Link to={'/edit/' + props.todo._id} className='text-danger'>
				Delete
			</Link>
		</td>
	</tr>
);

class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: []
		};
	}

	componentDidMount() {
		// mount the list of todos to the satate
		axios
			.get('http://localhost:4000/todos/')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	componentDidUpdate() {
		// update the list of todos
		axios
			.get('http://localhost:4000/todos/')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => {
				console.log(err);
			});
	}

	todoList() {
		return this.state.todos.map((currentTodo, i) => {
			return <Todo todo={currentTodo} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<h3 className='mt-4'>ToDos List</h3>
				<Table className='mt-4 text-white'>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.todoList()}</tbody>
				</Table>
			</div>
		);
	}
}

export default TodosList;
