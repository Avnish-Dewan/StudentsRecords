import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <Navbar bg="dark" variant="dark" expand="lg">
                    <Navbar.Brand>Student Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href='/'>
                                Home
                            </Nav.Link>
                            <Nav.Link href='/add/student'>
                                Add Student
                            </Nav.Link>
                            <Nav.Link href='/add/subject'>
                                Add Subject
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </Router>
        );
    }
}

export default Header;