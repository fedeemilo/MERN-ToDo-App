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

class EditTodo extends Component {
	constructor(props) {
		super(props);

		this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
		this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
		this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
		this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			todo_description: '',
			todo_responsible: '',
			todo_priority: '',
			todo_completed: false
		};
	}

	componentDidMount() {
		axios
			.get('http://localhost:4000/todos/' + this.props.match.params.id)
			.then((res) => {
				this.setState({
					todo_description: res.data.todo_description,
					todo_responsible: res.data.todo_responsible,
					todo_priority: res.data.todo_priority,
					todo_completed: res.data.todo_completed
				});
				console.log(this);
			})
			.catch((err) => {
				console.log(err);
			});
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

	onChangeTodoCompleted(e) {
		this.setState({
			todo_completed: !this.state.todo_completed
		})
	}

	onSubmit(e) {
		e.preventDefault();
		const obj = {
			todo_description: this.state.todo_description,
			todo_responsible: this.state.todo_responsible,
			todo_priority:	  this.state.todo_priority,
			todo_completed:   this.state.todo_completed
		}
		axios.post('http://localhost:4000/todos/update/'+this.props.match.params.id, obj)
			 .then(res => console.log(res.data));
		
		this.props.history.push('/');
	}


	render() {
		return (
			<div className='create-todo'>
				<h3 className='mt-3'>Update Todo</h3>

				<Row>
					<Col md={6} className='mx-auto'>
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
								<Label for="priorityOptions"></Label>
								<div className='form-check form-check-inline float-left'>
									<CustomInput
										type='radio'
										id='priorityLow'
										name='priorityOptions'
										label='Low'
										className='mx-2'
										value='Low'
										checked={this.state.todo_priority === 'Low'}
										onChange={this.onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityMedium'
										name='priorityOptions'
										label='Medium'
										className='mx-2'
										value='Medium'
										checked={this.state.todo_priority === 'Medium'}
										onChange={this.onChangeTodoPriority}
									/>
									<CustomInput
										type='radio'
										id='priorityHigh'
										name='priorityOptions'
										label='High'
										className='mx-2'
										value='High'
										checked={this.state.todo_priority === 'High'}
										onChange={this.onChangeTodoPriority}
									/>
								</div>
							</FormGroup>
							<FormGroup>
								<CustomInput
									type='checkbox'
									id='completedCheckbox'
									label='Completed'
									className="mt-2 ml-2 float-left"
									onChange={this.onChangeTodoCompleted}
									checked={this.state.todo_completed}
									value={this.state.todo_completed}
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
}

export default EditTodo;
