import axios from 'axios';
import React from 'react';
import {
    Form, Row, Col, Button, Container
} from 'react-bootstrap'
import config from '../config.json'

class AddStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: null,
            mname: null,
            lname: null,
            dob: null,
            email: null,
            address: null,
            age:null
        }
        this.setFirstName = this.setFirstName.bind(this)
        this.setMidName = this.setMidName.bind(this)
        this.setLname = this.setLname.bind(this)
        this.setage = this.setage.bind(this)
        this.setDob = this.setDob.bind(this)
        this.setemail = this.setemail.bind(this)
        this.setadd = this.setadd.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    setFirstName(fname) {
        this.setState({
            fname: fname,
        })
    }
    setMidName(mname) {
        this.setState({
            mname: mname,
        })
    }
    setLname(lname) {
        this.setState({
            lname: lname
        })
    }
    setage(age) {
        this.setState({
            age: age
        })
    }
    setDob(dob) {
        this.setState({
            dob: dob,
            age:this.getAge(dob)
        })
    }
    setemail(email) {
        this.setState({
            email: email
        })
    }
    setadd(address) {
        this.setState({
            address: address
        })
    }

    getAge(date){
        var dateParts = date.split("-");
        if(dateParts.length != 3){
            return ''
        }
        var birthDate = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    handleSubmit(event){
        event.preventDefault()
        const data = {
            fname:this.state.fname,
            midname:this.state.midname || null,
            lname:this.state.lname,
            dob:this.state.dob,
            age:this.state.age+'',
            email:this.state.email,
            address:this.state.address
        }
        axios.post(`${config.API_URL}/add/student`, data, {
            'Content-Type': 'application\json',
            'Access-Control-Allow-Origin': '*'
        }).then(response => {
            console.log(response);
            alert(response.data)
            window.location.reload()
        })
    }
    render() {
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="name" placeholder="Enter name"
                                onChange={(e) => this.setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="mname">
                            <Form.Label>Mid Name</Form.Label>
                            <Form.Control type="mname" placeholder="Enter Your middle name"
                                onChange={(e) => this.setMidName(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="lname">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control required type="name" placeholder="Enter your Last name"
                                onChange={(e) => this.setLname(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control required type="dob" placeholder="Enter Date Of Birth in the format DD-MM-YYYY"
                                onChange={(e) => this.setDob(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3" controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="age" disabled placeholder="Enter Your Age"
                                value={this.state.age}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control required type="email" placeholder="Enter Your email"
                                onChange={(e) => this.setemail(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control required type="add" placeholder="Enter Your Address"
                                onChange={(e) => this.setadd(e.target.value)} />
                        </Form.Group>
                    </Row>
                    <Button variant="danger" type="submit">
                        Add Student
                    </Button>
                </Form>
            </Container>
        )
    }
}

export default AddStudent;