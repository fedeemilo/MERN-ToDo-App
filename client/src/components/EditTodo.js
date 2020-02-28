import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Col,
	Row,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	CustomInput
} from 'reactstrap';

function EditTodo(todos) {
	const [todoDescription, setTodoDescription] = useState('');
	const [todoResponsible, setTodoResponsible] = useState('');
	const [todoPriority, setTodoPriority] = useState('');
	const [todoCompleted, setTodoCompleted] = useState(false);

	console.log(todos.params)

	useEffect(() => {
		fetchTodo();
	}, []);

	function fetchTodo() {
		axios
			.get('/todos/' + todos.match.params.id)
			.then((res) => {
				setTodoDescription(res.data.todo_description);
				setTodoResponsible(res.data.todo_responsible);
				setTodoPriority(res.data.todo_priority);
				setTodoCompleted(res.data.todo_completed);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function onChangeTodoDescription(e) {
		setTodoDescription(e.target.value);
	}

	function onChangeTodoResponsible(e) {
		setTodoResponsible(e.target.value);
	}

	function onChangeTodoPriority(e) {
		setTodoPriority(e.target.value);
	}

	function onChangeTodoCompleted(e) {
		setTodoCompleted(e.target.value);
	}

	function onSubmit(e) {
		e.preventDefault();
		const obj = {
			todo_description: todoDescription,
			todo_responsible: todoResponsible,
			todo_priority: todoPriority,
			todo_completed: todoCompleted
		};
		axios
			.put('/todos/update/' + todos.match.params.id, obj)
			.then((res) => console.log(res.data))
			.catch(err => {
				console.log(err);
			});
		
		todos.history.push('/');
	}


		return (
			<div className='create-todo'>
				<h3 className='mt-3'>Update Todo</h3>

				<Row>
					<Col md={6} className='mx-auto'>
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
								<Label for='priorityOptions'></Label>
								<div className='form-check form-check-inline float-left'>
									<CustomInput
										type='radio'
										id='priorityLow'
										name='priorityOptions'
										label='Low'
										className='mx-2'
										value='Low'
										checked={todoPriority === 'Low'}
										onChange={onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityMedium'
										name='priorityOptions'
										label='Medium'
										className='mx-2'
										value='Medium'
										checked={todoPriority === 'Medium'}
										onChange={onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityHigh'
										name='priorityOptions'
										label='High'
										className='mx-2'
										value='High'
										checked={todoPriority === 'High'}
										onChange={onChangeTodoPriority}
									/>
								</div>
							</FormGroup>
							<FormGroup>
								<CustomInput
									type='checkbox'
									id='completedCheckbox'
									label='Completed'
									className='mt-2 ml-2 float-left'
									onChange={onChangeTodoCompleted}
									checked={todoCompleted}
									value={todoCompleted}
								/>
							</FormGroup>
							<FormGroup className=' float-right'>
								<Button color='secondary'>Edit</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
}

export default EditTodo;
