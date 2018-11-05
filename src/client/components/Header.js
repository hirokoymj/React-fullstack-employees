import React from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, Row, Col, Navbar, Nav, NavItem} from 'react-bootstrap';

const Header = () =>(
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <NavLink to="/">Employee List</NavLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="/form">
        Create an employee
        </NavItem>
      </Nav>  
    </Navbar.Collapse>    

  </Navbar>
);
export default Header;



// <nav class="navbar navbar-inverse navbar-fixed-top" >
// 	<div class="container" >
// 		<div class="navbar-header" >
// 			<a class="navbar-brand"
// 			   href="/" >Lists Of Things
// 			</a >
// 		</div >
// 	</div >
// </nav >
// <Grid>
// <Row>
//   <Col xs={12}>
//     <ul className="nav nav-tabs">
//       <li><NavLink to="/" activeClassName="active">Dashboard</NavLink></li>
//       <li><NavLink to="/form" activeClassName="active">Add new employee</NavLink></li>
//     </ul>
//   </Col>
// </Row>
// </Grid>