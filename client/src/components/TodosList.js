import React, { useState, useEffect, useRef } from 'react';
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
	CustomInput
} from 'reactstrap';

function TodosList(props) {
	const [todos, setTodos] = useState([]);
	const [categorieTodos, setCategorieTodos] = useState([]);
	const [isActive, setIsActive] = useState(false);
	const [isActiveCateg, setIsActiveCateg] = useState(false);
	const [colSize, setColSize] = useState(12);
	const [newCateg, setNewCateg] = useState('');
	const [todoDescription, setTodoDescription] = useState('');
	const [todoResponsible, setTodoResponsible] = useState('');
	const [todoPriority, setTodoPriority] = useState('');
	const [todoCompleted, setTodoCompleted] = useState(false);
	// const [deleteCateg, setDeleteCateg] = useState(false);
	const [todoCreated, setTodoCreated] = useState(false);
	const [todoEliminated, setTodoEliminated] = useState(false);
	const [emptyCateg, setEmptyCateg] = useState(false);
	const [categories, setCategories] = useState([]);
	const prevTodos = usePrevious(todos);

	function Todo(todos) {
		return (
			<tr>
				<td className={todos.todo.todo_completed ? 'completed' : ''}>
					{todos.todo.todo_description}
				</td>
				<td className={todoCompleted ? 'completed' : ''}>
					{todos.todo.todo_responsible}
				</td>
				<td className={todos.todo_completed ? 'completed' : ''}>
					{todos.todo.todo_priority}
				</td>
				<td>
					<Link to={'/edit/' + todos.todo._id} className='mr-2 text-warning'>
						Edit
					</Link>
					<Link
						to={'/'}
						className='text-danger'
						onClick={(e) => todos.deleteTodo(e, todos.todo._id)}
					>
						Delete
					</Link>
				</td>
			</tr>
		);
	}

	useEffect(() => {
		todosFetching();
		console.log('Prev Todo List: ', prevTodos);
		console.log('Original todos: ', todos);
	}, []);

	// Hook of Previous Value
	function usePrevious(value) {
		// The ref object is a generic container whose current property is mutable ...
		// ... and can hold any value, similar to an instance property on a class
		const ref = useRef();

		// Store current value in ref
		useEffect(() => {
			ref.current = value;
		}, [value]); // Only re-run if value changes

		// Return previous value (happens before update in useEffect above)
		return ref.current;
	}

	// Fetch the Todos
	async function todosFetching() {
		await axios
			.get('/todos/')
			.then((res) => {
				console.log(res.data);
				setTodos((todos) => todos.concat(res.data));
			})
			.catch((err) => {
				console.log(err);
				return null;
			});

		
	}
	// Handle input of Todo Description
	function onChangeTodoDescription(e) {
		setTodoDescription(e.target.value);
	}
	// Handle input of Todo Responsible
	function onChangeTodoResponsible(e) {
		setTodoResponsible(e.target.value);
	}
	// Handle input of Todo Priority
	function onChangeTodoPriority(e) {
		setTodoPriority(e.target.value);
	}
	// Handle the submittion of Todo Creation
	async function onSubmit(e) {
		e.preventDefault();
		// Communication with the backend
		// create newTodo object
		console.log(todoDescription);
		console.log(todoResponsible);
		console.log(todoPriority);
		console.log(todoCompleted);
		const newTodo = {
			todo_description: todoDescription,
			todo_responsible: todoResponsible,
			todo_priority: todoPriority,
			todo_completed: todoCompleted
		};

		await axios
			.post('http://localhost:4000/todos/add', newTodo)
			.then(() => setTodos((todos) => todos.concat(newTodo)))
			.catch((err) => {
				console.log(err);
			});

		setTodoDescription('');
		setTodoResponsible('');
		setTodoPriority('');
		setTodoCompleted(false);

		setTodoCreated(true);
		setTimeout(() => {
			setTodoCreated(false);
		}, 2000);

		setTimeout(() => {
			refreshPage();
		}, 2000);
	}
	// List the todos inside a table
	function listTodos() {
		return todos.map((currentTodo, i) => {
			return (
				<Todo
					index={i}
					todo={currentTodo}
					key={currentTodo._id}
					deleteTodo={handleDelete}
				/>
			);
		});
	}
	
	// Show the Create Todo form
	function handleShowCreate() {
		setIsActive(true);
		setColSize(6);
	}
	// Hide the Create Todo form
	function handleHideCreate() {
		setIsActive(false);
		setColSize(12);
	}
	// Show Categories input
	function handleShowCateg() {
		setIsActiveCateg(true);
	}
	// Hide Categories input
	function handleHideCateg() {
		setIsActiveCateg(false);
	}
	// Handle Categories input
	function handleCategInput(e) {
		setNewCateg(e.target.value);
	}
	// Handle Category Submittion
	function handleCategSubmit(e) {
		e.preventDefault();
		let inputCateg = document.getElementById('createCategory');
		if (inputCateg.value.length === 0) {
			setEmptyCateg(true);
			return;
		}

		// Creo el objeto categoría
		const categ = {
			categorie_name: newCateg,
			categorie_todos: categorieTodos
		};

		// Utilizo axios para agregar la categoría a la base de datos
		axios
			.post('/categories/add', categ)
			.then((res) => setCategories((categories) => categories.concat(categ)))
			.catch((err) => {
				console.log(err);
				return null;
			});

		setNewCateg('');
		setEmptyCateg(false);

		inputCateg.value = '';
	}
	// Handle delete of Todo
	async function handleDelete(e, id) {
		console.log(id);
		await axios
			.delete('/todos/' + id)
			.then((res) => {
				console.log(res);
				setTodos(todos.filter((todo) => todo._id !== id));
			})
			.catch((err) => {
				console.log(err);
			});

		setTodoEliminated(true);
		setTimeout(() => {
			setTodoEliminated(false);
		}, 2000);
	}
	
	// Refresh the page
	function refreshPage() {
		window.location.reload(false);
	}

	return (
		<div>
			<Row>
				<Col className='col-mide-6' xs={colSize}>
					{todoCreated ? (
							<Alert className='mt-3'  color='success'>New Todo added successfully!</Alert>
					) : null}
					{todoEliminated ? (
							<Alert className='w-50 mt-3 mx-auto animated fadeIn' color='danger'>Todo deleted successfully!</Alert>
					) : null}
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
						<tbody>{listTodos()}</tbody>
					</Table>
				</Col>

				{isActive ? (
					<Col xs='6'>
						<h3 className='text-center mt-2'>Create New Todo</h3>
						<Row>
							<Col md={9} className='mx-auto'>
								<Form className='mt-4' onSubmit={onSubmit}>
									<FormGroup>
										<Label className='float-left' for='todoNew'>
											Description:
										</Label>
										<Input
											type='text'
											name='todoNew'
											id='todoNew'
											value={todoDescription}
											onChange={onChangeTodoDescription}
										/>
									</FormGroup>
									<FormGroup>
										<Label className='float-left' for='todoResponsible'>
											Responsible:
										</Label>
										<Input
											type='text'
											name='todoResponsible'
											id='todoResponsible'
											value={todoResponsible}
											onChange={onChangeTodoResponsible}
										/>
									</FormGroup>
									<FormGroup>
										<div className='form-check form-check-inline float-left'>
											<CustomInput
												type='radio'
												id='priorityLow'
												name='priorityOptions'
												label='Low'
												className='mx-2'
												value='Low'
												// checked={todo_priority === 'Low'}
												onChange={onChangeTodoPriority}
											/>
											<CustomInput
												type='radio'
												id='priorityMedium'
												name='priorityOptions'
												label='Medium'
												className='mx-2'
												value='Medium'
												// checked={todo_priority === 'Medium'}
												onChange={onChangeTodoPriority}
											/>
											<CustomInput
												type='radio'
												id='priorityHigh'
												name='priorityOptions'
												label='High'
												className='mx-2'
												value='High'
												// checked={todo_priority === 'High'}
												onChange={onChangeTodoPriority}
											/>
										</div>
									</FormGroup>
									<FormGroup className='mt-4 float-right'>
										<Button color='secondary'>Create</Button>
									</FormGroup>
								</Form>
							</Col>
						</Row>
					</Col>
				) : null}
			</Row>
			<Row className='mt-3'>
				<Col xs={4}>
					{!isActive ? (
						<Button outline color='secondary' onClick={handleShowCreate}>
							Show Create
						</Button>
					) : null}
					{isActive ? (
						<Button outline color='warning' onClick={handleHideCreate}>
							Hide Create
						</Button>
					) : null}
					{!isActiveCateg ? (
						<Button
							outline
							color='success'
							className='ml-4'
							onClick={handleShowCateg}
						>
							Add Category
						</Button>
					) : null}
					{isActiveCateg ? (
						<Button
							outline
							color='danger'
							className='ml-4'
							onClick={handleHideCateg}
						>
							Cancel
						</Button>
					) : null}
				</Col>
				<Col xs={4} className='mx-auto mt-5'>
					{isActiveCateg ? (
						<Form onSubmit={(e) => handleCategSubmit(e)}>
							<FormGroup>
								<Label for='createCategory'>New Category</Label>
								<Input
									type='text'
									name='category'
									id='createCategory'
									placeholder='Write a category...'
									onChange={(e) => handleCategInput(e)}
								/>
							</FormGroup>
							<Button>Save</Button>
						</Form>
					) : null}
				</Col>				
			</Row>
			
			
		</div>
	);
}

export default TodosList;
