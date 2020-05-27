import React, { useState, useEffect } from 'react';
import {
	Row,
	Col,
	ListGroup,
	Alert,
	ListGroupItem,
	Badge,
	Card,
	CardTitle,
	CardText,
	Button,
} from 'reactstrap';
import axios from 'axios';

function ShowCategs() {
	const [categories, setCategories] = useState([]);
	const [emptyCateg, setEmptyCateg] = useState(false);

	useEffect(() => {
		fetchCategories();
	}, []);

	// Fetch the Categories
	async function fetchCategories() {
		await axios
			.get('/categories/')
			.then((res) => {
				setCategories((categories) => categories.concat(res.data));
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	}

	// Map and return the list of categories
	function listCategories() {
		return categories.map((categ) => {
			return (
				<Col>
					<Card
						body
						inverse
						style={{ backgroundColor: '#333', borderColor: '#333' }}
						key={categ._id}
						className='categorie-list-element'
					>
						<CardTitle>{categ.categorie_name}</CardTitle>
						<Badge
							color='secondary'
							id={categ._id}
							onClick={(e) => handleCategDelete(e)}
							className='float-right c-pointer'
						>
							X
						</Badge>
	
						<Button color='secondary'>Open</Button>
					</Card>
				</Col>
			);
		});
	}

	// Handle Delete Category
	function handleCategDelete(e) {
		let idCateg = e.target.id;
		axios
			.delete('/categories/' + idCateg)
			.then((res) => {
				console.log(res);
				setCategories(categories.filter((categ) => categ._id !== idCateg));
			})
			.catch((err) => {
				console.log(err);
				return null;
			});
	}

	return (
		<div>
			<h4 className='mt-3 mb-3 text-center'>Categories</h4>
			<Row className='mt-5'>
		
					<Col xs={12}>
						{categories.length > 0 ? (
							<Row>
								{listCategories()}
							</Row>
						) : (
							<ListGroup className='text-dark'>
								<Alert
									color='info'
									style={{ transition: '2s' }}
									className='mx-auto mt-4'
								>
									There are no categories
								</Alert>
							</ListGroup>
						)}
						{emptyCateg ? (
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

export default ShowCategs;
