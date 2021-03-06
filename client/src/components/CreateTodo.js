import React, { Component } from 'react';
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

class CreateTodo extends Component {
	constructor(props) {
		super(props);

		this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
		this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
		this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		};
	}

	onChangeTodoDescription(e) {
		this.setState({
			todo_description: e.target.value
		});
	}

	onChangeTodoResponsible(e) {
		this.setState({
			todo_responsible: e.target.value
		});
	}

	onChangeTodoPriority(e) {
		this.setState({
			todo_priority: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		// Communication with the backend
		// create newTodo object
		const newTodo = {
			todo_description: this.state.todo_description,
			todo_responsible: this.state.todo_responsible,
			todo_priority: this.state.todo_priority,
			todo_completed: this.state.todo_completed
		};

		axios
			.post('http://localhost:4000/todos/add', newTodo)
			.then((res) => console.log(res.data));

		this.setState({
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		});

	}

	render() {
		return (
			<div className='mt-4 text-white ml-5'>
				<h3 className='text-center mt-2'>Create New Todo</h3>
				<Row>
					<Col md={9} className='mx-auto'>
						<Form className='mt-4' onSubmit={this.onSubmit}>
							<FormGroup>
								<Label className='float-left' for='todoNew'>
									Description:
								</Label>
								<Input
									type='text'
									name='todoNew'
									id='todoNew'
									value={this.state.todo_description}
									onChange={this.onChangeTodoDescription}
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
									value={this.state.todo_responsible}
									onChange={this.onChangeTodoResponsible}
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
										// checked={this.todo_priority === 'Low'}
										onChange={this.onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityMedium'
										name='priorityOptions'
										label='Medium'
										className='mx-2'
										value='Medium'
										// checked={this.todo_priority === 'Medium'}
										onChange={this.onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityHigh'
										name='priorityOptions'
										label='High'
										className='mx-2'
										value='High'
										// checked={this.todo_priority === 'High'}
										onChange={this.onChangeTodoPriority}
									/>
								</div>
							</FormGroup>
							<FormGroup className='mt-4 float-right'>
								<Button type='submitw' color='secondary'>Create</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}

export default CreateTodo;
