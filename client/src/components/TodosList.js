import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AppDropdown from './AppDropdown';
import {
	Table,
	Row,
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	ListGroup,
	ListGroupItem,
	Alert,
	Badge,
	ButtonDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';
import CreateTodo from '../components/CreateTodo';

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
			<Link
				to={'/'}
				className='text-danger'
				onClick={(e) => props.deleteTodo(props.todo._id, e)}
			>
				Delete
			</Link>
			{/* <img src={arrowDown} className='arrDown' /> */}
			<AppDropdown />
		</td>
	</tr>
);

class TodosList extends Component {
	constructor(props) {
		super(props);

		this.handleDelete = this.handleDelete.bind(this);
		this.handleHide = this.handleHide.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleShowCateg = this.handleShowCateg.bind(this);
		this.handleHideCateg = this.handleHideCateg.bind(this);
		this.handleCategInput = this.handleCategInput.bind(this);
		this.handleCategSubmit = this.handleCategSubmit.bind(this);
		this.handleCategDelete = this.handleCategDelete.bind(this);
		this.listCategories = this.listCategories.bind(this);

		this.state = {
			todos: [],
			isActive: false,
			isActiveCateg: false,
			colSize: 12,
			categories: [],
			newCateg: '',
			emptyCateg: false,
			deleteCateg: false,
			categorie_todos: []
		};
	}

	componentDidMount = async () => {
		// mount the list of todos to the satate
		await axios
			.get('http://localhost:4000/todos')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		await axios
			.get('http://localhost:4000/categories')
			.then((res) => {
				console.log(res);
				console.log(typeof res.data);
				this.setState({ categories: res.data });
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	};

	componentDidUpdate = async () => {
		// update the list of todos
		await axios
			.get('http://localhost:4000/todos/')
			.then((res) => {
				this.setState({ todos: res.data });
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		await axios
			.get('http://localhost:4000/categories/')
			.then((res) => {
				this.setState({ categories: res.data });
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	};

	// List the todos inside a table
	todoList() {
		return this.state.todos.map((currentTodo, i) => {
			return <Todo todo={currentTodo} key={i} deleteTodo={this.handleDelete} />;
		});
	}

	listCategories() {
		return this.state.categories.map((categ) => {
			return (
				<ListGroupItem className='categorie-list-element'>
					{categ.categorie_name}

					<Badge
						color='secondary'
						id={categ._id}
						onClick={(e) => this.handleCategDelete(e)}
						className='float-right c-pointer'
					>
						X
					</Badge>
				</ListGroupItem>
			);
		});
	}

	handleDelete = async (id, e) => {
		e.preventDefault();
		console.log(id);
		await axios
			.delete('http://localhost:4000/todos/' + id)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	};

	handleShow() {
		this.setState({ isActive: true, colSize: 6 });
	}

	handleHide() {
		this.setState({ isActive: false, colSize: 12 });
	}

	handleShowCateg() {
		this.setState({ isActiveCateg: true });
	}

	handleHideCateg() {
		this.setState({ isActiveCateg: false });
	}

	handleCategInput(e) {
		this.setState({ newCateg: e.target.value });
	}

	handleCategSubmit = async (e) => {
		e.preventDefault();
		let inputCateg = document.getElementById('createCategory');
		if (inputCateg.value.length == 0) {
			this.setState({ emptyCateg: true });
			return;
		}

		// Creo el objeto categoría
		const categ = {
			categorie_name: this.state.newCateg,
			categorie_todos: this.state.categorie_todos
		};

		console.log(this.state.categorie_todos);

		// Utilizo axios para agregar la categoría a la base de datos
		await axios
			.post('http://localhost:4000/categories/add', categ)
			.then((res) => console.log(res.data))
			.catch((err) => {
				console.log(err);
				return null;
			});

		this.setState({ newCateg: '' });
		this.setState({ emptyCateg: false });

		inputCateg.value = '';
	};

	handleCategDelete = async (e) => {
		await axios
			.delete('http://localhost:4000/categories/' + e.target.id)
			.then((res) => {
				console.log(res);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	};

	render() {
		return (
			<div>
				<Row>
					<Col className='col-mide-6' xs={this.state.colSize}>
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
					</Col>

					{this.state.isActive ? (
						<Col xs='6'>
							<CreateTodo />
						</Col>
					) : null}
				</Row>
				<Row className='mt-3'>
					<Col xs={4}>
						{!this.state.isActive ? (
							<Button outline color='secondary' onClick={this.handleShow}>
								Show Create
							</Button>
						) : null}
						{this.state.isActive ? (
							<Button outline color='warning' onClick={this.handleHide}>
								Hide Create
							</Button>
						) : null}
						{!this.state.isActiveCateg ? (
							<Button
								outline
								color='success'
								className='ml-4'
								onClick={this.handleShowCateg}
							>
								Add Category
							</Button>
						) : null}
						{this.state.isActiveCateg ? (
							<Button
								outline
								color='danger'
								className='ml-4'
								onClick={this.handleHideCateg}
							>
								Cancel
							</Button>
						) : null}
					</Col>
					<Col xs={4} className='mx-auto mt-5'>
						{this.state.isActiveCateg ? (
							<Form onSubmit={(e) => this.handleCategSubmit(e)}>
								<FormGroup>
									<Label for='createCategory'>New Category</Label>
									<Input
										type='text'
										name='category'
										id='createCategory'
										placeholder='Write a category...'
										onChange={(e) => this.handleCategInput(e)}
									/>
								</FormGroup>
								<Button>Save</Button>
							</Form>
						) : null}
					</Col>
					<Col xs={4}>
						<h4 className='mb-3'>Categories</h4>
						{this.state.categories.length > 0 ? (
							<ListGroup className='text-dark'>
								{this.listCategories()}
							</ListGroup>
						) : (
							<ListGroup className='text-dark'>
								<Alert
									color='info'
									style={{ transition: '2s' }}
									className='mx-auto mt-4'
								>
									No hay categorías cargadas
								</Alert>
							</ListGroup>
						)}
						{this.state.emptyCateg ? (
							<Alert
								color='warning'
								style={{ transition: '2s' }}
								className='mx-auto mt-1'
							>
								The category input cannot be empty!
							</Alert>
						) : null}
					</Col>
				</Row>
			</div>
		);
	}
}

export default TodosList;
