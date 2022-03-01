import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick(event){
        if (window.confirm(`Are you sure you want to logout?`)) {
            this.props.handleLogout(false, null,null);
        }
    }

    render() {
        if(this.props.role === 'admin'){
            return (
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
                                <Nav.Link onClick={this.handleClick}>
                                    <OverlayTrigger
                                        placement='bottom'
                                        overlay={
                                            <Tooltip>
                                                <strong>Log Out</strong>.
                                            </Tooltip>
                                        }>
                                    <i className="fa fa-sign-out"></i>
                                    </OverlayTrigger>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            );
        }else{
            return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand>Student Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href='/'>
                            Home
                        </Nav.Link>
                        <Nav.Link href='/view/subjects'>
                            View Subjects
                        </Nav.Link>
                        <Nav.Link href='/view/dues'>
                            View Dues
                        </Nav.Link>
                        <Nav.Link href='/view/marks'>
                            View Marks
                        </Nav.Link>
                        <Nav.Link onClick={this.handleClick}>
                            <OverlayTrigger
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        <strong>Log Out</strong>.
                                    </Tooltip>
                                }>
                                <i className="fa fa-sign-out"></i>
                            </OverlayTrigger>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            )
        }
    }
}

export default Header;