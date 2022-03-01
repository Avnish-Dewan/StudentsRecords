import React from 'react';
import axios from 'axios';
import config from '../../config.json'
import { Card, Col, Container, Form, Row } from 'react-bootstrap';
import { ThemeConsumer } from 'react-bootstrap/esm/ThemeProvider';

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            email : this.props.email
        }
    }

    convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-')
    }

    componentDidMount(){
        console.log(`${config.API_URL}/view/student/${this.props.email}`);
        axios.get(`${config.API_URL}/view/student/${this.props.email}`).then(response => {
            this.setState({
                data:response.data
            })
        })
    }

    render() {
        if(this.state.data){
            return (
                <Container fluid className="px-4 mt-4">
                        <Row>
                            <Col xl={4}>
                                <Card className="mb-4 mb-xl-0">
                                    <Card.Header className="card-header">Profile Picture</Card.Header>
                                    <Card.Body className="text-center">
                                        <img className="img-account-profile rounded-circle mb-2" src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                                            {/* <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                            <button className="btn btn-primary" type="button">Upload new image</button> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xl={8}>
                                <Card className="mb-4">
                                    <Card.Header>Student Profile</Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1" >Roll Number</Form.Label>
                                            <Form.Control type="number" value={this.state.data.rollNumber} disabled />
                                            </Form.Group>
                                            <Form.Group as={Row} className="gx-3 mb-3">
                                                <Col md={4}>
                                                    <Form.Label className="small mb-1" >First name</Form.Label>
                                                    <Form.Control  type="text" value={this.state.data.fname} disabled/>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Label className="small mb-1" >Middle name</Form.Label>
                                                <Form.Control type="text" value={this.state.data.midname} disabled/>
                                                </Col>
                                                <Col md={4}>
                                                    <Form.Label className="small mb-1" >Last name</Form.Label>
                                                <Form.Control type="text" value={this.state.data.lname} disabled/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="gx-3 mb-3">
                                                <Col md={6}>
                                                    <Form.Label className="small mb-1" >Date of Birth</Form.Label>
                                                <Form.Control type="text" value={this.convertDate(this.state.data.dob)} disabled />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label className="small mb-1">Age</Form.Label>
                                                <Form.Control type="number" value={this.state.data.age} disabled/>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label className="small mb-1" >Email address</Form.Label>
                                                <Form.Control type="email" value={this.state.email} disabled/>
                                            </Form.Group>
                                            <Form.Group as={Row} className="gx-3 mb-3">
                                                <Col md={6}>
                                                    <Form.Label className="small mb-1">Address</Form.Label>
                                                <Form.Control type="text" value={this.state.data.address} disabled />
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Label className="small mb-1" >Number of Subject Allocated</Form.Label>
                                                <Form.Control type="number" value={this.state.data.subjects.length} disabled/>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                </Container>
            )
        }else{
            return <h1>Loading</h1>
        }
    }
}

export default Profile;