import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import cn from 'classnames';

const Header = (props) => {
  //console.log(props.history);
  return(
    <Navbar inverse>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="/">Employee Dashboard</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavItem eventKey={1} href="/" className={cn({'active': props.history.location.pathname === '/'})}>
            Search
          </NavItem>
          <NavItem eventKey={2} href="/form" className={cn({'active': props.history.location.pathname === '/form'})}>
            Create
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default Header;
