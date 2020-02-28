import React, { Component } from 'react';
import logo from '../leon.svg';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

class AppNav extends Component {
	render() {
		return (
			<div>
				<Navbar color='dark' dark expand='md' className='border-bottom'>
	
					<img src={logo} style={{ width: '35px', marginRight: '10px' }} alt='logo' />
	
					<NavbarBrand href='/'>MERN-Stack ToDo App</NavbarBrand>
					<Nav navbar className='ml-auto'>
						<NavItem>
							<NavLink href='/'>ToDos</NavLink>
						</NavItem>
						{/* <NavItem>
							<NavLink href='/create'>Create</NavLink>
						</NavItem> */}
						<NavItem>
							<NavLink href='/categories'>Categories</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default AppNav;
