import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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
	Badge
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
		this.handleCategSubmit = this.handleCategSubmit.bind(this);
		this.listCategories = this.listCategories.bind(this);
		this.handleMouseHover = this.handleMouseHover.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);

		this.state = {
			todos: [],
			isActive: false,
			isActiveCateg: false,
			colSize: 12,
			categories: [],
			newCateg: '',
			focusCateg: false,
			emptyCateg: false,
			deleteCateg: false
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

		axios
			.get('http://localhost:4000/categories/')
			.then((res) => {
				console.log(res);
				console.log(typeof res.data);
				this.setState({ categories: res.data });
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

		axios.get('http://localhost:4000/categories/').then((res) => {
			this.setState({ categories: res.data });
		});
	}

	todoList() {
		return this.state.todos.map((currentTodo, i) => {
			return <Todo todo={currentTodo} key={i} deleteTodo={this.handleDelete} />;
		});
	}

	handleMouseHover(e) {}

	handleMouseLeave(e) {}

	listCategories() {
		return this.state.categories.map((categ) => {
			return (
				<ListGroupItem
					onMouseEnter={(e) => this.handleMouseHover(e)}
					onMouseLeave={(e) => this.handleMouseLeave(e)}
					className='categorie-list-element'
				>
					{categ.categorie_name}

					<Badge color='secondary' className='float-right c-pointer'>
						X
					</Badge>
				</ListGroupItem>
			);
		});
	}

	handleDelete(id, e) {
		e.preventDefault();
		console.log(id);
		axios.delete('http://localhost:4000/todos/' + id).then((res) => {
			console.log(res);
			console.log(res.data);
		});
	}

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
		console.log(this.state.newCateg);
	}

	handleCategSubmit(e) {
		e.preventDefault();
		let inputCateg = document.getElementById('createCategory');
		if (inputCateg.value.length == 0) {
			this.setState({ emptyCateg: true });
			setInterval(() => {
				this.setState({ emptyCateg: false });
			}, 4000);
			return;
		}

		// Creo el objeto categoría
		const categ = {
			categorie_name: this.state.newCateg,
			categorie_focus: false
		};

		// Utilizo axios para agregar la categoría a la base de datos
		axios
			.post('http://localhost:4000/categories/add', categ)
			.then((res) => console.log(res.data));

		this.setState({ newCateg: '' });

		inputCateg.value = '';
	}

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
					<Col xs={4} className='mx-auto mt-4'>
						{this.state.isActiveCateg ? (
							<Form onSubmit={(e) => this.handleCategSubmit(e)}>
								<FormGroup>
									<Label for='createCategory'>Category</Label>
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
						<ListGroup className='text-dark'>{this.listCategories()}</ListGroup>
					</Col>
					{this.state.emptyCateg ? (
						<Alert
							color='warning'
							style={{ transition: '2s' }}
							className='mx-auto mt-4'
						>
							The category input cannot be empty!
						</Alert>
					) : null}
				</Row>
			</div>
		);
	}
}

export default TodosList;
