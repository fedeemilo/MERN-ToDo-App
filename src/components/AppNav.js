import React, { Component } from 'react';
import logo from '../leon.svg';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	NavbarText
} from 'reactstrap';

class AppNav extends Component {
	render() {
		return (
			<div>
				<Navbar color='dark' dark expand='md' className='border-bottom'>
					<a className='navbar-brand'>
						<img src={logo} style={{width: '35px'}} />
					</a>
					<NavbarBrand href='/'>MERN-Stack ToDo App</NavbarBrand>
					<Nav navbar className='ml-auto'>
						<NavItem>
							<NavLink href='/'>List of Todos</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href='/create'>Create Todo</NavLink>
						</NavItem>
					</Nav>
				</Navbar>
			</div>
		);
	}
}

export default AppNav;
